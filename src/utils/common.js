export function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString('sr-RS', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}
