<details>
  <summary>Click to expand</summary>

```js
(async () => {
  const results = [];
  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  for (let i = 1; i <= 40; i++) {
    await delay(50);

    const questionEl = document.querySelector('h2.text-sm, h2.font-medium');
    let questionText = questionEl ? questionEl.innerText.trim() : '';
    questionText = questionText
      .replace(/^Câu\s*\d+\s*/i, '')
      .replace(/Trắc nghiệm\s*:*/i, '')
      .replace(/\s*:\s*/, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    questionText = `Câu hỏi ${i}: ${questionText}`;

    const answers = Array.from(
      document.querySelectorAll('div.relative.flex.items-center.space-x-2.p-2.border.rounded-lg')
    ).map((div) => {
      const label = div.querySelector('span.text-sm.font-medium')?.innerText.trim() || '';
      const text = div.querySelector('span.flex-1')?.innerText.trim() || '';
      return `${label} ${text}`;
    });

    if (questionText) {
      results.push({
        id: i,
        question: questionText,
        options: answers
      });
      console.log(`ok ${i}`);
    } else {
      console.log(`skip ${i}`);
      await delay(700);
      const retryEl = document.querySelector('h2.text-sm, h2.font-medium');
      let retryText = retryEl ? retryEl.innerText.trim() : '';
      retryText = retryText
        .replace(/^Câu\s*\d+\s*/i, '')
        .replace(/Trắc nghiệm\s*:*/i, '')
        .replace(/\s*:\s*/, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (retryText) {
        retryText = `Câu hỏi ${i}: ${retryText}`;
        const retryAnswers = Array.from(
          document.querySelectorAll('div.relative.flex.items-center.space-x-2.p-2.border.rounded-lg')
        ).map((div) => {
          const label = div.querySelector('span.text-sm.font-medium')?.innerText.trim() || '';
          const text = div.querySelector('span.flex-1')?.innerText.trim() || '';
          return `${label} ${text}`;
        });
        results.push({
          id: i,
          question: retryText,
          options: retryAnswers
        });
        console.log(`retry ok ${i}`);
      }
    }

    const nextBtn = [...document.querySelectorAll("button")].find(b => /Câu tiếp|Next/i.test(b.innerText));
    if (nextBtn) nextBtn.click();
    else break;
  }

  const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "questions.json";
  a.click();
})();
```
