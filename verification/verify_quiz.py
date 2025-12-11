from playwright.sync_api import sync_playwright

def verify_quiz_score():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:3000")

        # There are 10 questions. We need to answer them all.
        # We'll just answer the first option for all of them to get through quickly.

        for i in range(10):
            # Click the first option (button with text starting with 'A.')
            page.locator("button.btn.text-start").first.click()

            # Click Next (or Finish on the last one)
            if i < 9:
                page.get_by_role("button", name="Next »").click()
            else:
                page.get_by_role("button", name="Finish").click()

        # Wait for the score card to appear
        page.wait_for_selector(".score-circle")

        # Take a screenshot
        page.screenshot(path="verification/quiz_score.png")

        browser.close()

if __name__ == "__main__":
    verify_quiz_score()
