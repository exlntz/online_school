import type { JSX } from 'react'
import { PageHeader } from '../../../../components/common'
import { Container } from '../../../../shared/ui'


export const PracticePage = (): JSX.Element => {
    return (
        <Container variant='page'>
            <PageHeader />
        </Container>
    )
}
