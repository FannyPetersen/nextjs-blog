// ? Question: do we need to install and require .env like below?
/* require('dotenv').config({ path: '../.env' }) */
const spaceId = "bgueafn491vm";
/* process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID */
const accessToken = "iK_nJQ3bfEIrqozyyZHhhE9-BmL5zFgOIVRG1PIHoyM";
/* process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN */

const client = require("contentful").createClient({
  space: spaceId,
  accessToken: accessToken,
});

export async function fetchEntries() {
  const entries = await client.getEntries();
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function getAllPostIds() {
  const entries = await client.getEntries();
  if (entries.items) {
    return entries.items.map((e) => {
      return {
        params: {
          id: e.fields.title.replace(/ /g, "-"),
        },
      };
    });
  }
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function getPostData(postId) {
  const entries = await client.getEntries();
  const postData = entries.items.find(
    (e) => e.fields.title.replace(/ /g, "-") === postId
  );

  //console.log("RAWPOST", postData.fields);
  // CREATE HELPER FUNCTION LIKE BELOW?
  /*
  const convertPost = (postData) => {
  const rawPost = postData.fields;
  //const rawHeroImage = rawPost.heroImage ? rawPost.heroImage.fields : null;
  const rawHeroImage = rawPost.body.content... ? rawPost.heroImage.fields : null;

  const rawAuthor = rawPost.author ? rawPost.author.fields : null;
  return {
    id: postData.sys.id,
    body: rawPost.body,
    description: rawPost.description,
    publishedDate: moment(rawPost.publishedDate).format('DD MMM YYYY'),
    slug: rawPost.slug,
    tags: rawPost.tags,
    title: rawPost.title,
    heroImage: this.convertImage(rawHeroImage),
    author: this.convertAuthor(rawAuthor),
  };
}; 
*/

  const documentArray = postData.fields.body.content;
  console.log('BODY', postData.fields.body);
  console.log("documentArray", documentArray);

  // const imageee = documentArray[9].data.target.sys.type == 'Asset' ? postData.fields.body.content[9].data.target.fields.file.url : null;
  // console.log("IMAGE?", documentArray[9].data);

  
  let image;
  
  for (let i = 0; i < documentArray.length; i++) {
    if (documentArray[i].data.target) {
      image = documentArray[i].data.target.fields.file.url;
    }
    console.log("IMAGE", image);
    // return image;
  }
  
 // const image = documentArray[9].data.target.fields.file.url;

 //const body = documentArray;
  const body = postData.fields.body;
  const date = postData.fields.date;
  const title = postData.fields.title;
  const introduction = postData.fields.introduction;
  const id = postData.fields.title.replace(/ /g, "-");

  return {
    body,
    image,
    date,
    title,
    id,
    introduction,
  };
}

export default { fetchEntries, getAllPostIds, getPostData };
