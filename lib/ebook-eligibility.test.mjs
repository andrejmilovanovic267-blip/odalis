import assert from "node:assert/strict";
import test from "node:test";
import {
  EBOOK_MINIMUM_SUBTOTAL_RSD,
  getEbookPromotionMessage,
  isEbookEligibleSubtotal,
} from "./ebook-eligibility.ts";

test("eBook eligibility uses the 1,499 RSD minimum subtotal", () => {
  assert.equal(isEbookEligibleSubtotal(1498), false);
  assert.equal(isEbookEligibleSubtotal(1499), true);
  assert.equal(isEbookEligibleSubtotal(1500), true);
  assert.equal(EBOOK_MINIMUM_SUBTOTAL_RSD, 1499);
});

test("multiple product prices can reach the eBook minimum", () => {
  const subtotal = [750, 749].reduce((total, price) => total + price, 0);
  assert.equal(subtotal, 1499);
  assert.equal(isEbookEligibleSubtotal(subtotal), true);
});

test("promotion copy reports the remaining subtotal or the gift", () => {
  assert.equal(
    getEbookPromotionMessage(1498),
    "Dodajte još 1 RSD za besplatan ODALIS eBook",
  );
  assert.equal(
    getEbookPromotionMessage(1499),
    "Poklon: Besplatan ODALIS eBook",
  );
});
