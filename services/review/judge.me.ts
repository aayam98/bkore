import axios from "axios";

const judgeme_url = 'https://judge.me/api/v1/';
const shop_domain = 'bodykore-store.myshopify.com'
const api_key = 'Anb_WSn3oXrytyA_uyJWPnV0QZg'
const base_url = 'https://judge.me/api/v1/reviews?shop_domain=bodykore-store.myshopify.com&api_token=Anb_WSn3oXrytyA_uyJWPnV0QZg'


export interface RootReviewResponse {
    reviews: ReviewResponse[];
    current_page:number;
    per_page:number
}

export interface ReviewResponse {
    id: string;
    title: string;
    body: string;
    rating: number;
    product_external_id: number;
    reviewer: {
        id: number;
        external_id: number;
        email: string;
        name: string;
        phone: string | null;
        accepts_marketing: boolean;
        unsubscribed_at: string | null;
        tags: string | null;
    };
    source: string;
    curated: string;
    published: boolean;
    hidden: boolean;
    verified: string;
    featured: boolean;
    created_at: string;
    updated_at: string;
    has_published_pictures: boolean;
    has_published_videos: boolean;
    pictures: string[]; // Array of URLs or file paths for pictures
    ip_address: string;
    product_title: string;
    product_handle: string;
};


export const getReview  = async () =>{
    try {
        const response = await axios.get(`${judgeme_url}reviews?shop_domain=${shop_domain}&api_token=${api_key}`);
        return response.data as RootReviewResponse
    } catch (error) {
        throw error
    }
}