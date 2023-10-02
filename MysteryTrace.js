/*
 * File: MysteryTrace.js
 * ---------------------
 * This file traces the Mystery problem from the practice midterm.
 */

"use strict";

function MysteryDemo() {
    new MysteryTrace();
}

class MysteryTrace extends CodeTrace {

    constructor() {
        super("MysteryTrace");
        this.reset();
    }

    setParameters() {
        this.setMaxStackDepth(3);
        this.setFrameHeight(MysteryTrace.FRAME_HEIGHT);
        this.setFrameDeltas(MysteryTrace.FRAME_DX,
                            MysteryTrace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("mystery", new Mystery());
        this.defineFunction("enigma", new Enigma());
    }

    reset() {
        let console = document.getElementById("MysteryConsole");
        console.innerHTML = "";
        super.reset();
    }

    run() {
        this.call("mystery", "abcdefgh");
    }

}

MysteryTrace.FRAME_HEIGHT = 460;
MysteryTrace.FRAME_DX = 16;
MysteryTrace.FRAME_DY = 52;
MysteryTrace.STRING_WIDTH = 230;
MysteryTrace.CHAR_WIDTH = 150;
MysteryTrace.INT_WIDTH = 130;
MysteryTrace.VAR_HEIGHT = 50;

class Mystery extends CTFunction {

    constructor() {
        super(Mystery.HTML);
    }

    createFrame(ct) {
        let cf = new CTStackFrame(ct, this);
        cf.addVariable("w", MysteryTrace.STRING_WIDTH,
                            MysteryTrace.VAR_HEIGHT);
        cf.addVariable("s", MysteryTrace.STRING_WIDTH,
                            MysteryTrace.VAR_HEIGHT);
        cf.addVariable("i", MysteryTrace.INT_WIDTH,
                            MysteryTrace.VAR_HEIGHT);
        cf.getVariable("s").setQuoteFlag(true);
        cf.getVariable("w").setQuoteFlag(true);
        cf.layoutVariables();
        return cf;
    }

    async run(ct) {
        let cf = ct.getCurrentFrame();
        let w = ct.pop();
        let s = undefined;
        let i = undefined;
        cf.set("w", w);
        await ct.traceStep("#1", () => cf.set("s", s = ""));
        await ct.traceStep("#2", () => undefined);
        for (i = 0; i < 4; i++) {        
            await ct.traceStep("#2a", () => cf.set("i", i));
            if (await ct.traceStep("#3", () => i % 3 === 0)) {
                await ct.traceStep("#4",
                                   () => cf.set("s", s += w[w.length - 1]));
            } else {
                await ct.traceStep("#5", () => cf.set("s", s += w[0]));
            }
            await ct.traceStep("#6", () => undefined);
            let t = await ct.traceStep("#6a",
                async function() {
                    return await ct.call("enigma", w, i);
                });
            await ct.traceStep("#6", () => cf.set("s", s += t));
        }
        await ct.traceStep("#7", () => println(s));

        function enigma(s, k) {
            return s[4 - k % 3];
        }
            
        function println(s) {
            let stdout = document.getElementById("MysteryConsole");
            stdout.innerHTML += "<span class='output'>" + s + "</span><br />";
            stdout.scrollTop = stdout.scrollHeight;
        }

    }
}

Mystery.HTML =
    "<span class='keyword'>def</span> mystery(w):\n" +
    "    <span class='keyword'>def</span> enigma(s, k):\n" +
    "        return s[4 - k % 3]\n" +
    "\n" +
    "    <span class='#1'>s = <span class='strlit'>\"\"</span></span>\n" +
    "    <span class='#2'><span class='keyword'>for</span> " +
         "<span class='#2a'>i <span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(4)</span>:</span>\n" +
    "        <span class='#3'><span class='keyword'>if</span> " +
         "i % 3 == 0:</span>\n" +
    "            <span class='#4'>s += w[<span class='builtin'>len</span>" +
         "(w) - 1]</span>\n" +
    "        <span class='keyword'>else</span>:\n" +
    "            <span class='#5'>s += w[0]</span>\n" +
    "        <span class='#6'>s += <span class='#6a'>enigma(w, i)</span>" +
         "</span>\n" +
    "    <span class='#7'><span class='keyword'>return</span> s</span>\n"


class Enigma extends CTFunction {

    constructor() {
        super(Enigma.HTML);
    }

    createFrame(ct) {
        let cf = new CTStackFrame(ct, this);
        cf.addVariable("s", MysteryTrace.STRING_WIDTH,
                            MysteryTrace.VAR_HEIGHT);
        cf.addVariable("k", MysteryTrace.INT_WIDTH,
                            MysteryTrace.VAR_HEIGHT);
        cf.getVariable("s").setQuoteFlag(true);
        cf.layoutVariables();
        return cf;
    }

    async run(ct) {
        let cf = ct.getCurrentFrame();
        let k = ct.pop();
        let s = ct.pop();
        cf.set("s", s);
        cf.set("k", k);
        await ct.traceStep("#1", () => undefined);
        let t = await ct.traceAndTag("#1b", () => 4 - k % 3);
        return await ct.traceStep("", () => s[t]);
    }
}

Enigma.HTML =
    "<span class='keyword'>def</span> enigma(s, k):\n" +
    "    <span class='#1'>return <span class='#1a'>s" +
         "[<span class='#1b'>4 - k % 3</span>]</span></span>\n";
