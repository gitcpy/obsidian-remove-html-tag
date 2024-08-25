import { Plugin, MarkdownView } from 'obsidian';

export default class RemoveHtmlTagsPlugin extends Plugin {
  async onload() {
    console.log('Loading RemoveHtmlTagsPlugin');

    this.addCommand({
      id: 'remove-html-tags',
      name: 'Remove HTML Tags',
      callback: () => this.removeHtmlTags(),
    });
  }

  onunload() {
    console.log('Unloading RemoveHtmlTagsPlugin');
  }

  removeHtmlTags() {
    const activeLeaf = this.app.workspace.activeLeaf;
    if (activeLeaf && activeLeaf.view instanceof MarkdownView) {
      const editor = activeLeaf.view.editor;

      // 获取当前选择内容的范围
      const selection = editor.getSelection();
      const selectionStart = editor.getCursor("from");
      const selectionEnd = editor.getCursor("to");

      // 清除 HTML 标签
      const cleanedSelection = selection.replace(/<[^>]+>/g, '');

      // 更新选定的文本
      editor.replaceSelection(cleanedSelection);

      // 恢复光标到清除后的文本开头
      editor.setSelection(selectionStart, selectionStart);
    }
  }
}
