import type { JSX } from 'react'
import { Container } from '../../../../shared/ui'
import { PageHeader } from '../../../../widgets/page-header'


export const TaskBankPage = (): JSX.Element => {
    return (
        <Container variant='page'>
            <PageHeader />
        </Container>
    )
}
