// await getComments().then(data => comments = data);


// await getCategories().then(data => categories = data);
// await getCategoryByName("Chim bồ câu").then(data => console.log(data));
// await getCategoryByID("Cate10d7de").then(data => console.log(data));
// await createCategory("Chim chích chòe", "this is chim cc").then(data => console.log(data));
// await updateCategory("Cateaa306a","Chim chích chòe nè", "this is chim cchoe").then(data => console.log(data));


// await getPosts().then(data => posts = data);
  await getPostsUser().then((data) => console.log(data));
  // await createPost(
  //   "chim chích chòe nè",
  //   "chim cc 2",
  //   "hcm",
  //   "2023-06-28T13:24:08.660",
  //   "2023-06-28T13:24:08.660",
  //   "Mem40080c3",
  //   [{ categoryID: "Cate10d7de" }],
  //   [{ linkMedia: "MNG91188d0" }]
  // ).then((data) => console.log(data));
  // await searchPostsUser("bồ câu").then(data => console.log(data));
  // await searchPostsManager().then(data => console.log(data));
  // await getJoinPosts("Postca781f").then(data => console.log(data));
  // await getLikePosts("Postca781f").then(data => console.log(data));
  // await updatePost(
  //   "Post78bf71",
  //   "chim chích chòe nèeeee",
  //   "chim cc 22222",
  //   "hcmmmmm",
  //   "2023-06-28T13:24:08.660",
  //   "2023-06-28T13:24:08.660",
  //   "Mem047047c",
  //   [{ categoryID: "Cate10d7de" }],
  //   [{ linkMedia: "MNG91188d0" }]
  // ).then((data) => console.log(data));
  // await deletePost("Postca781f").then((data) => console.log(data));
  // await moderatePost("Post7a4917", true, "MNG91188d0").then((data) => console.log(data));


  
  // await like("Mem40080c3", "Posta05a2c").then((data) => console.log(data));
  // await dislike("Mem40080c3", "Posta05a2c").then((data) => console.log(data));