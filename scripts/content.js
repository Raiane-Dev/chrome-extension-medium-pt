console.log("running");

document.addEventListener('readystatechange', event => {
        if(document.readyState == "complete") {

            const section = document.querySelector('article section');
            
            async function translateText(text, target_ln) {
                const res = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&format=json&dt=t&q=" + encodeURI(text), {
                    method: "GET",
                });
            
                const data = await res.text();
                if(data != null) {
                    return JSON.parse(data)[0].map(s => s[0]).join("\n") ?? "";
                }
            }
            
            if (section) {
                const paragraphs = section.querySelectorAll('p, li, h2, h3');
            
                paragraphs.forEach(async paragraph => {
                    const original_text = paragraph.textContent.trim();
                    const translate_text = await translateText(original_text, 'pt');
            
                    const translated_p = document.createElement('p');
                    translated_p.textContent = translate_text;
                    paragraph.insertAdjacentElement('afterend', translated_p);
            
                    translated_p.style.marginTop = "2em";
                    translated_p.style.backgroundColor = "#e9e9e9";
                    translated_p.style.color = "black";
                    translated_p.style.fontWeight = "500";
                    translated_p.style.fontSize = "1rem";
                    translated_p.style.padding = "1em";
                    translated_p.style.borderRadius = ".5em";
            
                });
            }            
        }
});