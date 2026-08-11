(() => {
  const inquiryTemplate = `您好，我想詢問汽車鑰匙／防盜系統服務：

1. 車輛品牌與車型：
2. 出廠年份：
3. 目前是否還有可用鑰匙：
4. 啟動方式（插鑰匙／旋鈕／按鍵啟動）：
5. 車輛所在地：
6. 想處理的問題：

如有鑰匙或故障情況，請一併提供照片或影片，謝謝。`;

  async function copyInquiry(button) {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inquiryTemplate);
        copied = true;
      }
    } catch (_) { copied = false; }
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = inquiryTemplate;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand('copy');
      textarea.remove();
    }
    if (copied) {
      const originalText = button.textContent;
      button.textContent = '已複製，請貼到 LINE';
      button.classList.add('is-copied');
      window.setTimeout(() => { button.textContent = originalText; button.classList.remove('is-copied'); }, 2200);
    }
  }

  document.querySelectorAll('.button-copy').forEach((button) => button.addEventListener('click', () => copyInquiry(button)));
  document.querySelectorAll('a[data-mobile-target]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!window.matchMedia('(max-width: 700px)').matches) return;
      const target = document.getElementById(link.dataset.mobileTarget);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${target.id}`);
    });
  });
  document.querySelectorAll('.auth-list details, .faq-list details').forEach((details) => {
    const marker = details.querySelector('summary span:last-child');
    const updateMarker = () => {
      if (marker) marker.textContent = details.open ? '−' : '＋';
    };

    details.removeAttribute('open');
    updateMarker();
    details.addEventListener('toggle', updateMarker);
  });
})();
