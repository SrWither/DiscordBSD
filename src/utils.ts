export function injectStyle(styleString: string): void {
    const style = document.createElement("style");
    style.textContent = styleString;
    document.head.append(style);
}

export function injectScript(scriptString: string): void {
    let script = document.createElement("script");
    script.textContent = scriptString;
    document.body.append(script);
}
