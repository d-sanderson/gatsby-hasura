
exports.createPages = async({ actions: { createPage }, graphql }) => {


const result = await graphql(`
{
    blog {
        posts {
            title
            id
        }
    }
}
`)
const posts = result.data.blog.posts;
posts.forEach(post => {
    const { id } = post
    createPage({
        path: `/post/${id}`,
        component: require.resolve("./src/templates/post.js"),
        context: {
            id: id
        }
    })
})

}
