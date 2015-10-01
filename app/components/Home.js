import React, {Component} from 'react';
import ProductsTable from './ProductsTable';
import ProductsStore from '../stores/ProductsStore';
import ProductsActions from '../actions/ProductsActions';
import Categories from './Categories';
import CategoriesStore from '../stores/CategoriesStore';
import CategoriesActions from '../actions/CategoriesActions';
import Paging from './Paging';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.getStateFromStores();
		this.onChange = this.onChange.bind(this);
	}

	getStateFromStores() {
		return {
			products: ProductsStore.getState().products,
			pages: ProductsStore.getState().pages,
			categories: CategoriesStore.getState().categories
		};
	}

	componentDidMount() {
		ProductsStore.listen(this.onChange);
		CategoriesStore.listen(this.onChange);
		ProductsActions.getProducts('',{});
		CategoriesActions.getCategories('',{});
	}

	componentWillUnmount() {
		ProductsStore.unlisten(this.onChange);
		CategoriesStore.unlisten(this.onChange);
	}

	onChange(state) {
		if (state.displayName === "ProductsStore")
			this.setState({products:state.products, pages:state.pages, categories:this.state.categories});
		else if(state.displayName === "CategoriesStore")
			this.setState({products:this.state.products, pages:this.state.pages, categories:state.categories});
	}

	render() {
		
		return (
			<div>
				<h1>Best Buy Developer API</h1>
				<h2><i>featuring React.js, Flux architecture and Node.js</i></h2>
				<Paging pages={this.state.pages} search={this.state.products.search}/>
				<Categories categories={this.state.categories} />
				<ProductsTable products={this.state.products} /> 
			</div>
		);
	}
}