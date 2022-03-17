import { getProduct } from "../api";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";
import Rating from "../components/Rating";

const ProductScreen = {
  after_render: async() => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    hideLoading();
    if(product.countInStock > 0){
      document.getElementById("add-button").addEventListener("click", 
      () => {
        document.location.hash = `/cart/${request.id}`;
      });
    }
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    hideLoading();
    if (product.error) {
      return `<h1>${product.error}</h1>`;
    }
    // return `<h1>${product.name}</h1>`;
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Back to result</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" /> 
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews.`,
              })}
            </li>
            <li>
              Price: <strong>$${product.price} </strong>
            </li> 
            <li>
                Description:
                <div>
                  ${product.description}
                </div>

            </li>

          </ul>
        </div>
        <div class="details-action">
          <ul>
            <li>
                Price: $${product.price}
            </li>
            <li>
                Status:
                ${
                  product.countInStock > 0
                    ? `<span class="success">In stock</span>`
                    : `<span class="error">Unavailable</span>`
                }

            </li>
            <li>
                <button id="add-button" class="primary fw">Add to cart</button> 
            </li>
          </ul>
        </div>
      </div>
    </div>
    `;
  },
};
export default ProductScreen;
