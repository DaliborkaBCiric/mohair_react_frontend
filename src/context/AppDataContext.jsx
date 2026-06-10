import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])

	const [blogCategories, setBlogCategories] = useState([])
	const [latestPosts, setLatestPosts] = useState([])

	const [blogPosts, setBlogPosts] = useState([])

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true)

				const [
					productsData,
					categoriesData,
					blogCategoriesData,
					blogPostsData,
					latestPostsData
				] = await Promise.all([
					api.getProducts(),
					api.getCategories(),
					api.getBlogCategories(),
					api.getLatestBlogPosts(),
					api.getBlogPosts(),
				])

				setProducts(productsData)
				setCategories(categoriesData)

				setBlogCategories(blogCategoriesData)
				setBlogPosts(blogPostsData)
				setLatestPosts(latestPostsData)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [])

	return (
		<AppDataContext.Provider
			value={{
				loading,
				products,
				categories,
				blogPosts,
				blogCategories,
				latestPosts
			}}
		>
			{children}
		</AppDataContext.Provider>
	)
}

export function useAppData() {
	const context = useContext(AppDataContext)

	if (!context) {
		throw new Error(
			'useAppData mora biti korišćen unutar AppDataProvider'
		)
	}

	return context
}