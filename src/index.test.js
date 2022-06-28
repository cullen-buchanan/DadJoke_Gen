import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull()
    expect(getByText(container, 'Dad Joke Generator')).toBeInTheDocument()
  })

  it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'Click me for a Dad Joke')).toBeInTheDocument()
  })

  it('renders a new paragraph via JavaScript when the button is clicked', async () => {
    const button = getByText(container, 'Click me for a Dad Joke')
    
    fireEvent.click(button)
    let generatedParagraphs = container.querySelectorAll('#DadJoke-container p')
    expect(generatedParagraphs.length).toBe(1)

    fireEvent.click(button)
    generatedParagraphs = container.querySelectorAll('#DadJoke-container p')
    expect(generatedParagraphs.length).toBe(2)

    fireEvent.click(button)
    generatedParagraphs = container.querySelectorAll('#DadJoke-container p')
    expect(generatedParagraphs.length).toBe(3)
  })
})