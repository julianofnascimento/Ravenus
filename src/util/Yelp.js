
const apiKey = 'zhNUPgEuEWNPULxUC2QAn3wu59LRWPl9pg0sA0e6HRdoSNWbV3zv0LgOFU0vB1AMcN86kQ4IUYDOWW_mffL1EdDKLS295lIPnffvF1jxPOjtWznLw5Nxtr0a1K5GX3Yx';

const Yelp = {
    search(term, location, sortBy) {
        const urlToFetch = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

        return fetch(corsAnywhere + urlToFetch, { headers: 
            { Authorization: `Bearer ${apiKey}`}
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            if(jsonResponse.businesses) {
                console.log(jsonResponse.businesses);
                return jsonResponse.businesses.map((business) => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    };
                });
            }
        });
    }
}

export default Yelp;