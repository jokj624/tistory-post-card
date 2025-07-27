const utilString = require('../utils/string');

exports.getPostCardSvg = (
  postLink,
  blogTitle,
  description,
  postTitle,
  tags,
) => `
 <svg
  width="450"
  height="120"
  viewBox="0 0 450 120"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <a href='${postLink}'>
  ${this.getStyles()}
  <rect x="0.5" y="0.5" width="449" height="119" rx="4.5" stroke="#EB531F" />
   <g transform="translate(20,30)" >
    ${this.getTistoryLogoSvg()}
   <text x="20" y="0" fill="black" class="blog"> ${blogTitle} 
   <tspan class="desc">${utilString.truncate(description, 40)}</tspan> 
  </text>
  <text x="0" y="30" class="title"> ${postTitle} </text>
  </g>
  ${this.getTagsSvg(tags)}
  </a>
 </svg>
`;

exports.getStyles = () => `
<style>
    @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    } 

    text {
      font-family: 'Pretendard-Regular', sans-serif;
    }

    .blog {
      font-size: 12px;
      fill: black;
      opacity: 0.5;
    }
    .desc {
      font-size: 10px;
      fill: black;
      opacity: 0.6;
    }
    .title {
      fill: black;
      font-size: 16px;
      opacity: 0.8;
    }
  </style>
`;

exports.getTistoryLogoSvg = () => `
  <svg width="13" height="13" viewBox="0 0 459 459" xmlns="http://www.w3.org/2000/svg"  x="0" y="-11">
    <path d="M229.5,0C102.75,0,0,102.75,0,229.5S102.75,459,229.5,459,459,356.25,459,229.5,356.25,0,229.5,0ZM130.21,191.45a39.57,39.57,0,1,1,39.56-39.57A39.58,39.58,0,0,1,130.21,191.45ZM229.5,390a39.56,39.56,0,1,1,39.56-39.56A39.56,39.56,0,0,1,229.5,390Zm0-99.29a39.56,39.56,0,1,1,39.56-39.56A39.56,39.56,0,0,1,229.5,290.74Zm0-99.29a39.57,39.57,0,1,1,39.56-39.57A39.57,39.57,0,0,1,229.5,191.45Zm99.29,0a39.57,39.57,0,1,1,39.57-39.57A39.57,39.57,0,0,1,328.79,191.45Z"
      fill="#EB531F"/>
   </svg>
`;

exports.getTagsSvg = (tags) => {
  const fontSize = 10;
  const horizontalPadding = 16;
  const spacing = 10;
  const y = 15;
  const height = 22;

  const tagElements = tags.map((tagText) => {
    const approxLength = tagText
      .split('')
      .reduce((sum, char) => sum + (/[가-힣]/.test(char) ? 1 : 0.6), 0);
    const textWidth = approxLength * fontSize;
    const rectWidth = textWidth + horizontalPadding;

    return { tagText, rectWidth };
  });

  let xPos = 0;
  let tagSvg = `<g transform="translate(20,70)">`;

  tagElements.forEach(({ tagText, rectWidth }) => {
    const textX = xPos + rectWidth / 2;
    tagSvg += `
      <rect
        x="${xPos}"
        y="${y}"
        rx="6"
        height="${height}"
        width="${rectWidth}"
        stroke="#EB531F"
        stroke-width="0.5"
        fill="none"
      />
      <text
        x="${textX}"
        y="${y + 14}"
        font-size="${fontSize}"
        fill="#000"
        font-family="Pretendard-Regular, sans-serif"
        text-anchor="middle"
      >${tagText}</text>
    `;

    xPos += rectWidth + spacing;
  });

  tagSvg += `</g>`;
  return tagSvg;
};
