import type { JSX } from 'react'
import { Ecosystem, MentalSupport, Mentors, Testimonials, Trial } from "../../../components/sections"
import { Hero } from '../../../widgets/hero-section'
import { Pricing } from '../../../widgets/pricing-section'



export const HomePage = (): JSX.Element => {
    return (
        <>
            <main>
                <Hero />
                <Ecosystem />
                <Trial />
                <Mentors />
                <Pricing />
                <Testimonials />
                <MentalSupport />
            </main>
        </>
    )
}