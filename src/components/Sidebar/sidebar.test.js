import React from "react"
import { render, screen} from '@testing-library/react'
import Sidebar from "./Sidebar"
test("Sidebar works properly", () => {
    render(<Sidebar/>)
    const userData = screen.getByText("Strona główna")
    expect(userData).toBeInTheDocument()
})