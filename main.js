function isValidUrl(urlString) {
  const urlPattern = new RegExp(
    "^((([A-Za-z]{3,9}:(?:\\/\\/)?)" +
      "(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|" +
      "(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)" +
      "((?:\\/[\\+~%\\/.\\w\\\\-_]*)?\\??(?:[-\\+=#&;%@.\\w_]*)#?" +
      "(?:[.\\!\\/\\\\w]*))?)",
    "i"
  );
  return !!urlPattern.test(urlString);
}

async function handlePTLinkPaste(event) {
  event.preventDefault();

  let selection = window.getSelection();
  let cliptext = event.clipboardData.getData("text/plain");
  let selectedtext = selection.toString();

  if (!(selectedtext === "") && isValidUrl(cliptext)) {
    cliptext = "[" + selectedtext + "](" + cliptext + ")";
  }

  let alltext = event.target.value;
  let selectionStart = event.target.selectionStart;

  event.target.value =
    alltext.slice(0, event.target.selectionStart) +
    cliptext +
    alltext.slice(event.target.selectionEnd, alltext.length);
  event.target.selectionStart = selectionStart + cliptext.length;
  event.target.selectionEnd = selectionStart + cliptext.length;
}

async function enhancePTLink(event) {
  var textareaAttrb;

  try {
    // todo: DRY out literals and reduce branching
    // todo: add handling for comment links (adding '(comment)' suffix to link text)
    // todo: add ctrl+alt modifier for adding pt project name prefix to link text
    if (
      event.ctrlKey &&
      (event.target.id.startsWith("story_copy_link_") ||
        event.target.id.startsWith("epic_copy_link_"))
    ) {
      event.preventDefault();
      if (event.target.id.startsWith("story_copy_link_")) {
        textareaAttrb = event.target.id.replace(
          "story_copy_link_",
          "NameEdit--"
        );
      }
      if (event.target.id.startsWith("epic_copy_link_")) {
        textareaAttrb = event.target.id.replace(
          "epic_copy_link_",
          "NameEdit--"
        );
      }
      const storyName = document.querySelectorAll(
        `[data-focus-id="${textareaAttrb}"]`
      )[0].value;
      const htmlSource = `<a href="${event.target.attributes["data-clipboard-text"].value}">${storyName}</a>`;
      const plainSource = `[${storyName}](${event.target.attributes["data-clipboard-text"].value})`;
      const blobInputHTML = new Blob([htmlSource], { type: "text/html" });
      const blobInputPlain = new Blob([plainSource], { type: "text/plain" });
      const clipboardItem = new ClipboardItem({
        "text/plain": blobInputPlain,
        "text/html": blobInputHTML,
      });
      await navigator.clipboard.write([clipboardItem]);
    }
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("click", enhancePTLink);
document.addEventListener("paste", handlePTLinkPaste);
