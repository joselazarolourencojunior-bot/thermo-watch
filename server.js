const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Supabase connection
const supabaseUrl = 'https://qanyszslnactgtzpmtyj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbnlzenNsbmFjdGd0enBtdHlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY0ODk4MCwiZXhwIjoyMDc3MjI0OTgwfQ.zZcaf9CVPK0HhMkQ6JB80bNhq7-dYF84i8A4PuHMJFY';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Connected to Supabase');

// Create tables if not exist (only new ones, not touching existing)
// Note: You may need to create these tables manually in Supabase if the anon key doesn't have CREATE permissions
const createTables = async () => {
  try {
    // For Supabase, table creation might require service role key
    // Assuming tables are created manually or via dashboard
    console.log('Ensure tables contacts and newsletter_subscribers exist in Supabase');
  } catch (err) {
    console.error('Error:', err);
  }
};

// Routes
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received contact:', { name, email, phone, message });
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, phone, message }]);
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    console.log('Contact inserted:', data);
    res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error('Error inserting contact:', err.message);
    res.status(500).json({ success: false, message: 'Erro ao enviar mensagem.' });
  }
});

app.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  console.log('Received newsletter:', { email });
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }], { onConflict: 'email' });
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    console.log('Subscriber inserted:', data);
    res.status(200).json({ success: true, message: 'Inscrito com sucesso na newsletter!' });
  } catch (err) {
    console.error('Error inserting subscriber:', err.message);
    res.status(500).json({ success: false, message: 'Erro ao inscrever na newsletter.' });
  }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Start server
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await createTables();
});