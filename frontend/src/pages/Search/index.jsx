import React from 'react'
import Container from '../../components/Layouts/Container'
import SearchPanel from '../../components/SearchPanel'

export default function Search() {
    return (
        <Container>
            <SearchPanel
                queryKey={['users', 'search']}
                url='/user/list'
            />
        </Container>
    )
}
