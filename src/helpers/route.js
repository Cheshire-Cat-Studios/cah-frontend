import get from 'lodash.get'
import routes from '../config/routes'

export default (path_name, parameters) => {
	let url_path = get(routes, path_name)

	if (!url_path) {
		throw new Error(`route ${name} does not exist`)
	}

	if (!parameters) {
		return import.meta.env.VITE_BACKEND_URL + url_path
	}

	if (typeof parameters === 'string') {
		url_path = url_path.replace('?', parameters)
	} else {
		parameters.length
			? parameters.forEach(parameter => {
				url_path = url_path.replace(new RegExp('(:)\\w+'), parameter)
			})
			: Object.keys(parameters).forEach(parameter => {
				url_path = url_path.replace(':' + parameter, parameters[parameter])
			})
	}

	return import.meta.env.VITE_BACKEND_URL + url_path
}