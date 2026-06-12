import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [materials, setMaterials] = useState([])

	const [blogCategories, setBlogCategories] = useState([])
	const [latestPosts, setLatestPosts] = useState([])
	const [blogPosts, setBlogPosts] = useState([])

	const [loading, setLoading] = useState(true)

	async function getMaterialBySlug(slug) {
		try {
			return await api.getMaterial(slug)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true)

				const [
					productsData,
					categoriesData,
					materialsData,
					blogCategoriesData,
					latestPostsData,
					blogPostsData
				] = await Promise.all([
					api.getProducts(),
					api.getCategories(),
					api.getMaterials(),
					api.getBlogCategories(),
					api.getLatestBlogPosts(),
					api.getBlogPosts()
				])

				setProducts(productsData)
				setCategories(categoriesData)
				setMaterials(materialsData)
				setBlogCategories(blogCategoriesData)
				setLatestPosts(latestPostsData)
				setBlogPosts(blogPostsData)
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
				materials,
				blogPosts,
				blogCategories,
				latestPosts,
				getMaterialBySlug
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