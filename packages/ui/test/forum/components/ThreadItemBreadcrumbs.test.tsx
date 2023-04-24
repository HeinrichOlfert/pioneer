import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ThreadItemBreadcrumbs } from '@/forum/components/threads/ThreadItemBreadcrumbs'

import { mockCategories } from '../../_mocks/forum'
import { MockQueryNodeProviders } from '../../_mocks/providers'

jest.mock('@/forum/hooks/useForumMultiQueryCategoryBreadCrumbs', () => ({
  useForumMultiQueryCategoryBreadCrumbs: jest.fn(() => ({
    isLoading: false,
    breadcrumbs: mockCategories,
  })),
}))
// jest.mock('@/forum/queries', () => ({
//   useGetForumCategoryBreadcrumbQuery: jest.fn(({ variables, skip }) => {
//     if (skip) return {}
//     const { id } = variables.where
//     const category = mockCategories.find((category) => category.id === id)

//     return {
//       isLoading: false,
//       data: { forumCategoryByUniqueInput: category },
//     }
//   }),
// }))

describe('ThreadItemBreadcrumbs', () => {
  it('Default', async () => {
    renderComponent('4')
    expect(await screen.findByText('Forum')).toBeDefined()
    expect(await screen.findByText(mockCategories[0].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[1].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[2].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[3].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[4].title)).toBeDefined()
  })

  function renderComponent(id: string) {
    render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <ThreadItemBreadcrumbs id={id} />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
