import type { JSX } from 'react'
import { Container } from '../../../../shared/ui'
import { PageHeader } from '../../../../widgets/page-header'


export const PracticePage = (): JSX.Element => {
    return (
        <Container variant='page'>
            <PageHeader />
        </Container>
    )
}
