import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "Data Scientist",
    "Graphic Designer",
    "FullStack Developer"
]

function CategoryCarousel() {

    const navigate = useNavigate();

    function searchJobHandler(category) {
        if (category) {
            navigate(`/browse?search=${encodeURIComponent(category)}`);
        }
    }

    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {category.map((category, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button variant='outline' className="rounded-full w-full" onClick={() => searchJobHandler(category)}>{category}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />

            </Carousel>
        </div>
    )
}

export default CategoryCarousel