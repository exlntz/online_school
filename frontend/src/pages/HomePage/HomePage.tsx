import type { JSX } from 'react'
import { Ecosystem, Hero, MentalSupport, Mentors, Pricing, Testimonials, Trial } from "../../components/sections"



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