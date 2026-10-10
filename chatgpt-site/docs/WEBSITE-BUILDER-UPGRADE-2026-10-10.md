# Website builder upgrade

The existing Bonga Bhengu app now has a template gallery, reusable sections, explicit undo/redo buttons, Desktop/Tablet/Phone canvas controls, a canvas focus mode, save status and Ctrl/Command+S draft saving.

This extends the already installed [GrapesJS repository](https://github.com/GrapesJS/grapesjs), pinned at 0.23.6 with its BSD-3-Clause license retained. The three original layouts are Business launch, Fashion collection and Creative portfolio. Eight original reusable sections can be dragged from the existing block panel or appended with Add section. All placeholder content remains editable.

Templates start a new draft and require confirmation before discarding unsaved edits. They retain saved projects and clear undo history between projects. Saving continues to use the existing account-backed, revision-checked API. Public publication still requires a saved draft and explicit review. Selecting a template, inserting a section or saving a draft never publishes a website.

Verification covers controller flows for cancellation, section insertion, undo/redo, device selection, keyboard save, saved/private draft boundaries, failure handling and publication. The existing module, authentication and Worker asset checks also run. Browser layout was not verified because the supported browser capability is unavailable in this managed environment.
