require('dotenv').config();

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Enter Email address');
    this.passwordInput = page.getByPlaceholder('Enter Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async goto() {
    await this.page.goto(process.env.EXIM_BASE_URL);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
