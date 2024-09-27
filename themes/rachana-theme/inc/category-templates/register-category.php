<?php function get_category_templates()
{
  $templates = array();
  $template_dir = get_template_directory() . '/templates/category-templates/';
  if (is_dir($template_dir)) {
    $files = scandir($template_dir);
    foreach ($files as $file) {
      if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
        $template_name = pathinfo($file, PATHINFO_FILENAME);
        $templates[$template_name] = ucwords(str_replace('category-', ' ', $template_name));
      }
    }
  }
  return $templates;
}

function add_category_template_field($term)
{
  $templates = get_category_templates();
  $current_template = get_term_meta($term->term_id, 'category_template', true);
  ?>
  <tr class="form-field">
    <th scope="row"><label for="category_template">Category Template</label></th>
    <td>
      <select name="category_template" id="category_template">
        <option value="">Default</option>
        <?php foreach ($templates as $value => $label): ?>
          <option value="<?php echo esc_attr($value); ?>" <?php selected($current_template, $value); ?>>
            <?php echo esc_html($label); ?></option>
        <?php endforeach; ?>
      </select>
      <p class="description">Select a template for this category.</p>
    </td>
  </tr>
  <?php
}
add_action('category_edit_form_fields', 'add_category_template_field');

function save_category_template($term_id)
{
  if (isset($_POST['category_template'])) {
    update_term_meta($term_id, 'category_template', sanitize_text_field($_POST['category_template']));
  }
}
add_action('edited_category', 'save_category_template');