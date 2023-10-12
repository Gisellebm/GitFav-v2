const buttonBlue = document.querySelector('.ph-arrow-circle-left');
const buttonPink = document.querySelector('.ph-arrow-circle-right');

buttonBlue.addEventListener('click', () => { 
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`:root {
        --color-actived: 66, 211, 255;
    }
    `);
    document.adoptedStyleSheets = [sheet];

})

buttonPink.addEventListener('click', () => {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`:root {
        --color-actived: 219, 77, 199;
    }
    `);
    document.adoptedStyleSheets = [sheet];

})