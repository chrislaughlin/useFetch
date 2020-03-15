import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

describe('Example', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    expect(1).toEqual(1);
  })
})
