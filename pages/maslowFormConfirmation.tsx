import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

import SingleProduct from '@components/ui/bodykore/Sections/Product'
import ImgPagSlider from '@components/ui/bodykore/Sliders/ImgPagSlider'
import { imageNotFound, mediaUrl } from '@utils/baseUrls'
import { getHeader, HeaderData } from '@utils/header'
import { getProduct, Product } from 'services/shopify/storefront'
import { getReviewsOfProduct, Review } from 'services/stamped'
import { getStrapiProduct, ProductStrapi } from 'services/strapi'

interface MaslowFormConfirmationProps {
  header: HeaderData
  product: Product
  productStrapi: ProductStrapi
  setupFeeProduct: Product
  addOnWeightProducts: Product[]
  reviews: Review[] | undefined
}

const MaslowFormConfirmation = ({
  product,
  reviews,
  productStrapi,
  setupFeeProduct,
  addOnWeightProducts,
}:MaslowFormConfirmationProps) => {
  const [selected, setSelected] = useState(0)
  const [activeBanner, setActiveBanner] = useState('')
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const mapImages = () => {
    return product.images.edges.map((item) => ({
      url: item.node.url,
      btn3d: true,
    }))
  }

  const getRating = () => {
    if (!reviews || reviews.length === 0) return 0
    
    const sum = reviews.reduce((acc, review) => acc + review.reviewRating, 0)
    return sum / reviews.length
  }

  const mapTechnologies = () => {
    return (
      productStrapi &&
      productStrapi.attributes.technologies.data.map((ele) => ({
        title: ele.attributes.title,
        description: ele.attributes.description,
        image: ele.attributes.image.data
          ? ele.attributes.image.data.map((image) => {
              return mediaUrl + image.attributes.url
            })
          : [imageNotFound],
        iconImage: mediaUrl + ele.attributes.iconImage.data.attributes.url,
      }))
    )
  }

  const mapOptions = () => {
    return product.variants.edges
      .sort((a, b) => 
        b.node.quantityAvailable - a.node.quantityAvailable
      )
      .sort((a, b) => 
        Number(b.node.availableForSale) - Number(a.node.availableForSale)
      )
      .map((item) => ({
        title: item.node.title,
        id: item.node.id,
        price: item.node.priceV2.amount,
        prevPrice: item.node.compareAtPriceV2?.amount,
        img: item.node.image?.url,
        available: item.node.availableForSale,
        quantityAvailable: item.node.quantityAvailable,
      }))
  }

  const scrollDown = () => {
    const element = document.getElementById('reviews')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <div className="bg-yellow-400 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black flex items-center justify-center gap-2">
            You&apos;re In! 🎉 Welcome to the Maslow Moves Challenge!
          </h1>
          <p className="text-black mt-4 text-sm md:text-lg">
            Thank you for signing up! Check your email soon for all the challenge details and next steps.
            In the meantime, don&apos;t miss this exclusive opportunity to gear up like James Maslow himself!
          </p>
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold text-black">
            Ready to Crush Your Workouts? Grab the Exclusive &quot;On the Road with Maslow&quot; Fitness Kit Today!
          </h1>
        </div>
      </div>

      <div className="py-14 m-auto max-w-7xl" id="productid">
        <div className="grid lg:grid-cols-3 grid-cols-1 items-start gap-y-3">
          <div className="col-span-2 relative">
            {mapOptions()[selected].prevPrice !== undefined && (
              <div className="absolute z-10 right-7 top-5">
                <p className="font-roboto font-bold italic text-base text-white bg-red-bc2026 rounded-md px-4 py-2">
                  SAVE $
                  {(
                    +mapOptions()[selected].price -
                    +mapOptions()[selected].prevPrice!
                  ).toFixed(2)}
                </p>
              </div>
            )}

            <div onClick={() => setActiveBanner('')}>
              <ImgPagSlider
                bgImage={mapImages()}
                productStrapi={productStrapi}
                activeBg={activeBanner}
              />
            </div>
          </div>

          <div className="col-span-1">
            <SingleProduct
              rating={getRating()}
              technologies={mapTechnologies()}
              product={{
                title: product.title,
                image: product.images.edges[0].node.url,
                id: productStrapi.attributes.handle,
                price: product.variants.edges[0].node.priceV2.amount,
                quantity: product.variants.edges[0].node.quantityAvailable,
              }}
              numReviews={reviews?.length || 0}
              description={productStrapi.attributes.description}
              options={mapOptions()}
              reviewOnClick={scrollDown}
              tags={product.tags}
              setupFeeProduct={setupFeeProduct}
              dimension={
                productStrapi.attributes.specification.length > 0
                  ? productStrapi.attributes.specification[0].dimensions
                  : ''
              }
              addOnWeightProducts={addOnWeightProducts}
              diagramAct={(data: string) => setActiveBanner(data)}
              slug={'squat-box-mx1182'}
              isVisible={isVisible}
              cards={[]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const header = await getHeader()
    const product = await getProduct('on-the-road-with-maslow-fitness-kit')
    const productStrapi = await getStrapiProduct('on-the-road-with-maslow-fitness-kit')
    const reviews = await getReviewsOfProduct(product!.id.split('/').pop() + '')

    return {
      props: { 
        header, 
        product, 
        productStrapi, 
        reviews,
        setupFeeProduct: null, // Add appropriate value
        addOnWeightProducts: [], // Add appropriate value
      },
    }
  } catch (error) {
    console.error('Error fetching server-side props:', error)
    
    return {
      props: {
        header: null,
        product: null,
        productStrapi: null,
        reviews: [],
        setupFeeProduct: null,
        addOnWeightProducts: [],
      },
    }
  }
}

export default MaslowFormConfirmation