(async () => {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  const correctAnswers = {
    1: "A", 2: "A", 3: "A", 4: "A", 5: "A",
    6: "A", 7: "A", 8: "A", 9: "A", 10: "A",
    11: "A", 12: "C", 13: "A", 14: "A", 15: "A",
    16: "A", 17: "A", 18: "A", 19: "A", 20: "A",
    21: "A", 22: "A", 23: "A", 24: "A", 25: "A",
    26: "A", 27: "A", 28: "A", 29: "A", 30: "A",
    31: "A", 32: "A", 33: "A", 34: "A", 35: "A",
    36: "A", 37: "A", 38: "A", 39: "A", 40: "A",
  };

  for (let i = 1; i <= 40; i++) {
    await delay(300);

    const options = Array.from(
      document.querySelectorAll('div.relative.flex.items-center.space-x-2.p-2.border.rounded-lg')
    );

    if (options.length > 0) {
      const correct = correctAnswers[i]?.toUpperCase();
      const target = options.find(opt => {
        const label = opt.querySelector('span')?.innerText?.trim()?.toUpperCase();
        return label?.startsWith(correct + ".");
      });

      if (target) target.click();
    }

    const nextBtn = [...document.querySelectorAll("button")].find(b => /Câu tiếp/i.test(b.innerText));
    if (nextBtn) nextBtn.click();
    else break;
  }
})();
