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
          id: e.fields.title.replace(/ /g, '-')
        },
      };
    });
  }
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function getPostData(postId) {
  const entries = await client.getEntries();
  const postData = entries.items.find(e => e.fields.title.replace(/ /g, '-') === postId);
 
  /* CREATE HELPER FUNCTION LIKE BELOW?
  convertPost = (rawData): BlogPost => {
  const rawPost = rawData.fields;
  const rawHeroImage = rawPost.heroImage ? rawPost.heroImage.fields : null;
  const rawAuthor = rawPost.author ? rawPost.author.fields : null;
  return {
    id: rawData.sys.id,
    body: rawPost.body,
    description: rawPost.description,
    publishedDate: moment(rawPost.publishedDate).format('DD MMM YYYY'),
    slug: rawPost.slug,
    tags: rawPost.tags,
    title: rawPost.title,
    heroImage: this.convertImage(rawHeroImage),
    author: this.convertAuthor(rawAuthor),
  };
}; */


// ITERATE OVER NESTED ARRAYs'
// lägger ihop allt till en string men utan formatting <-----------
// och också ingen media
const documentArray = postData.fields.body.content;
let body = '';

console.log('documentArray', documentArray);

 for (let i=0; i < documentArray.length; i++) {

  for (let j=0; j < documentArray[i].content.length; j++) {
    body += `${ documentArray[i].content[j].value}`;

    // console.log('STYLES', documentArray[i].content[j].marks[0]);
    
    documentArray[i].content[j].marks[0] ? console.log(documentArray[i].content[j].marks[0]) : console.log('nope');;
  }
}

  const date = postData.fields.date;
  const title = postData.fields.title;
  const introduction = postData.fields.introduction;
  const id = postData.fields.title.replace(/ /g, '-');

  return {
    body,
    date,
    title,
    id,
    introduction,
  };
}

export default { fetchEntries, getAllPostIds, getPostData };
