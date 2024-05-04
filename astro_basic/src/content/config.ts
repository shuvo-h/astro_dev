import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    schema: ({image})=>z.object({
        author: z.string(),
        date: z.string(), 
        image: image(),     // astro will find the path of the image from the relative path to make absolute path
        title: z.string(),
    })
})

export const collections = {
    posts: postsCollection,   // propertyName must match with folderName where the contents are exist
}