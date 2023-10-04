/*
 * File: MysteryTrace.js
 * ---------------------
 * This file traces the Mystery problem from the practice midterm.
 */

"use strict";

function Mystery2Demo() {
    new Mystery2Trace();
}

class Mystery2Trace extends CodeTrace {

    constructor() {
        super("Mystery2Trace");
        this.reset();
    }

    setParameters() {
        this.setMaxStackDepth(3);
        this.setFrameHeight(Mystery2Trace.FRAME_HEIGHT);
        this.setFrameDeltas(Mystery2Trace.FRAME_DX,
                            Mystery2Trace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("mystery", new Mystery2());
        this.defineFunction("enigma", new Enigma2());
    }

    reset() {
        let console = document.getElementById("Mystery2Console");
        console.innerHTML = '<span class="prompt">>>></span> <span class="builtin">print</span>(mystery(<span class="strlit">"abcdefgh"</span>)) <br />';
        super.reset();
    }

    run() {
        this.call("mystery", "abcdefgh");
    }

}

Mystery2Trace.FRAME_HEIGHT = 460;
Mystery2Trace.FRAME_DX = 16;
Mystery2Trace.FRAME_DY = 52;
Mystery2Trace.STRING_WIDTH = 230;
Mystery2Trace.CHAR_WIDTH = 150;
Mystery2Trace.INT_WIDTH = 130;
Mystery2Trace.VAR_HEIGHT = 50;

class Mystery2 extends CTFunction {

    constructor() {
        super(Mystery2.HTML);
    }

    createFrame(ct) {
        let cf = new CTStackFrame(ct, this);
        cf.addVariable("x", Mystery2Trace.STRING_WIDTH,
                            Mystery2Trace.VAR_HEIGHT);
        cf.addVariable("z", Mystery2Trace.STRING_WIDTH,
                            Mystery2Trace.VAR_HEIGHT);
        cf.addVariable("y", Mystery2Trace.INT_WIDTH,
                            Mystery2Trace.VAR_HEIGHT);
        cf.getVariable("z").setQuoteFlag(true);
        cf.getVariable("x").setQuoteFlag(true);
        cf.layoutVariables();
        return cf;
    }

    async run(ct) {
        let cf = ct.getCurrentFrame();
        let x = ct.pop();
        let z = undefined;
        let y = undefined;
        cf.set("x", x);
        await ct.traceStep("#1", () => cf.set("y", y = x.length));
        await ct.traceStep("#2", () => cf.set("z", z = x[x.length + 1-y]));
        z = z + await ct.traceStep("#3",
            async function() {
                return await ct.call("enigma", x, y);
            });
        cf.set("z", z);
        z = z + await ct.traceStep("#4",
            async function() {
                return await ct.call("enigma", x, y - 2);
            });
        cf.set("z", z);
        await ct.traceStep("#5", () => println(z));

        function enigma(s, t) {
            t -= 2;
            let n = ""
            for (let i=0; i < s.length; i += 6) {
                n += s[i];
            }
            n += s[t];
            return n;
        }
            
        function println(s) {
            let stdout = document.getElementById("Mystery2Console");
            stdout.innerHTML += "<span class='output'>" + s + "</span><br />";
            stdout.scrollTop = stdout.scrollHeight;
        }

    }
}

Mystery2.HTML =
    "<span class='skeyword'>def</span> <span class='funcname'>mystery</span>(<span class='params'>x</span>):\n" +
    "    <span class='skeyword'>def</span> <span class='funcname'>enigma</span>(<span class='params'>s, t</span>):\n" +
    "        t -= 2\n" +
    "        <span class='keyword'>return</span> s[::6] + s[t]\n" +
    "\n" +
    "    <span class='#1'>y = <span class='builtin'>len</span>(x)</span>\n" +
    "    <span class='#2'>z = x[1 - y]</span>\n" +
    "    <span class='#3'>z += enigma(x, y)</span>\n" +
    "    <span class='#4'>z += enigma(x, y - 2)</span>\n" +
    "    <span class='#5'><span class='keyword'>return</span> z</span>\n"


class Enigma2 extends CTFunction {

    constructor() {
        super(Enigma2.HTML);
    }

    createFrame(ct) {
        let cf = new CTStackFrame(ct, this);
        cf.addVariable("s", Mystery2Trace.STRING_WIDTH,
                            Mystery2Trace.VAR_HEIGHT);
        cf.addVariable("t", Mystery2Trace.INT_WIDTH,
                            Mystery2Trace.VAR_HEIGHT);
        cf.getVariable("s").setQuoteFlag(true);
        cf.layoutVariables();
        return cf;
    }

    async run(ct) {
        let cf = ct.getCurrentFrame();
        let t = ct.pop();
        let s = ct.pop();
        cf.set("s", s);
        cf.set("t", t);
        await ct.traceStep("#1", () => {t -= 2; cf.set("t", t);} );
        let k1 = await ct.traceAndTag("#2a", () => {let n = ""; for (let i=0; i < s.length; i+=6) {n += s[i]}; return (n)});
        let k2 = await ct.traceAndTag("#2b", () => {return s[t]});
        return await ct.traceStep("", () => k1 + k2);
    }
}

Enigma2.HTML =
    "<span class='skeyword'>def</span> <span class='funcname'>enigma</span>(<span class='params'>s, t</span>):\n" +
    "    <span class='#1'>t -= 2</span>\n" +
    "    <span class='#2'><span class='keyword'>return</span> <span class='#2a'>s[::6]</span> + " +
         "<span class='#2b'>s[t]</span></span>\n";
