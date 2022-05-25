const axios = require("axios");
const cheerio = require("cheerio");

const getCharacterPage = async () => {
  const url = "https://you-zitsu.fandom.com/wiki/Category:Characters";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const categories = $("ul.category-page__members-for-char");
  const characterPageNames = [];

  for (let i = 0; i < categories.length; i++) {
    const ul = categories[i];
    const charactersLIs = $(ul).find("li.category-page__member");

    for (let j = 0; j < charactersLIs.length; j++) {
      const li = charactersLIs[j];
      const path =
        $(li).find("a.category-page__member-link").attr("href") || "";

      const name = path.replace("/wiki/", "");
      characterPageNames.push(name);
    }
  }

  return characterPageNames;
};

const getCharacterInfo = async (characterName) => {
  const url = "https://you-zitsu.fandom.com/wiki/" + characterName;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let name = $('h2[data-source="name"]').text();
  if (!name) {
    name = characterName.replace("_", " ");
  }

  let nickname = $(
    'div[data-source="nickname"] > div.pi-data-value.pi-font > span > i > span.t_nihongo_romaji'
  ).text();
  if (!nickname) {
    nickname = undefined;
  }

  let image = $(
    'div[data-source="image1"] > div.wds-tab__content.wds-is-current > figure.pi-item.pi-image > a.image.image-thumbnail > img'
  ).attr("srcset");
  if (!image) {
    image = undefined;
  }

  const characterInfo = {
    name,
    nickname,
    image,
  };

  return characterInfo;
};

// const getCharacteristicsInfo = async () => {
//   const CharacteristicsInfo = {
//     gender,
//     age,
//     dateOfBirth,
//     height,
//     hairColor,
//     eyeColor,
//   };

//   return CharacteristicsInfo;
// };

// const getProfessionalInfo = async () => {
//   const ProfessionalInfo = {
//     schoolId,
//     classe,
//     club,
//     group,
//     occupation,
//     affiliation,
//   };

//   return ProfessionalInfo;
// };

module.exports = {
  getCharacterPage,
  getCharacterInfo,
  // getCharacteristicsInfo,
  // getProfessionalInfo,
};
