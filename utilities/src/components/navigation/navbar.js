import { LitElement, css, html } from "lit";

export class Navbar extends LitElement {
  static properties = {
    name: {},
    menuItems: { state: true },
  };
  static styles = css`
    :host { 
      display: block; 
      padding:1rem
    }
    :host > header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 3rem;
      top: 0;
      left: 0;
      background-color: #ffffff;
      padding 1rem;
    }
    :host > header > * {
      margin: 0 0.5rem;
    }
    :host > header > nav {
      display: flex;
    }
    header > nav a {
      margin: 0 0.5rem;
    }
  `;

  constructor() {
    super();
    this.name = "World";
  }
  render() {
    return html`
      <header>
        ${this.name}
        <nav>
          <a href="/">Home</a>
          <a href="/deals">Deals</a>
          <a href="/vehicles">Vehicles</a>
        </nav>
        <p>${["✨", "🔥", "❤️"]}</p>
      </header>
    `;
  }
}
customElements.define("cs-navbar", Navbar);
