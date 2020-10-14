// ? Question: do we need to install and require .env like below?
/* require('dotenv').config({ path: '../.env' }) */
const space = 'bgueafn491vm'
/* process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID */
const accessToken = 'iK_nJQ3bfEIrqozyyZHhhE9-BmL5zFgOIVRG1PIHoyM'
/* process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN */

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
  const entries = await client.getEntries()
  if (entries.items) return entries.items
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function getAllPostIds() {
  const entries = await client.getEntries();
  if (entries.items) {
    console.log('ITEMS', entries.items);
    return entries.items.map(e => {
      return {
        params: {
          id: e.fields.title.replace(/ /g, '-')
        }
      }
    });
  }
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function getPostData(id) {
  /*
  const entries = await client.getEntries();
  const postData = entries.items.find(e => {
    e.fields.postId === id;
  }) 

  const contentHtml = postData.fields.body;
  const date = postData.fields.date;

  return {
    contentHtml,
    date,
    title,
  }
  */
}

export default { fetchEntries, getAllPostIds, getPostData }
