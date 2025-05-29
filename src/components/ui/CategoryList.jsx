import { Link } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = ({ categories }) => {
  return (
    <div className="category-list">
      <h2 className="category-list-title">Shop By Category</h2>
      
      <div className="categories">
        {categories.map(category => (
          <Link to={`/?category=${category.name.toLowerCase()}`} className="category-item" key={category.id}>
            <div className="category-image">
              <img src={category.imageUrl} alt={category.name} />
            </div>
            <p className="category-name">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;