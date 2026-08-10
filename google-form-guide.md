# ACK Berea Youth Online Questionnaire — Google Form Setup Guide

## Form Settings
- **Title:** ACK Berea Youth Website Feedback
- **Description:** Help us improve the ACK Berea website! This survey takes 4-6 minutes. Your honest feedback helps us serve you better.
- **Collect email addresses:** OFF (anonymous)
- **Limit to 1 response:** ON
- **Show progress bar:** ON
- **Shuffle question order:** OFF
- **Edit after submit:** ON

---

## Section 1: Screener

### Q1. How old are you?
- **Type:** Multiple choice
- **Options:**
  - Under 13
  - 13–17
  - 18–24
  - 25+
- **Required:** Yes
- **Skip logic:** If "Under 13" → End of survey (show message: "Thank you for your interest. For participants under 13, please have a parent or guardian contact us at [church email] to provide consent.")

### Q2. Have you opened the ACK Berea website today, right before starting this survey?
- **Type:** Multiple choice
- **Options:**
  - Yes
  - No
- **Required:** Yes
- **Skip logic:** If "No" → Show section: "Please open https://ack-berea.vercel.app/ in another tab, spend 2-3 minutes exploring it as you normally would, then come back and continue."

---

## Section 2: Before Today

### Q3. In the last month, how did you usually find out about church updates (service times, events, sermons)?
- **Type:** Checkboxes (select all that apply)
- **Options:**
  - WhatsApp group
  - Church website
  - Instagram/Facebook
  - Someone told me in person
  - I didn't
  - Other (please specify)
- **Required:** Yes

### Q4. Last time you wanted to read or look up a Bible verse on your phone, what did you use?
- **Type:** Multiple choice
- **Options:**
  - A Bible app (e.g. YouVersion)
  - Google search
  - A physical Bible
  - Church website
  - I don't recall doing this
  - Other (please specify)
- **Required:** Yes

---

## Section 3: Task Check (While/Just After Using the Site)

### Q5. Just now, try to find what time Sunday service starts. Once you've found it (or given up after a minute), answer:
- **Type:** Multiple choice
- **Options:**
  - Found it quickly
  - Found it but took a while
  - Couldn't find it
  - Didn't try
- **Required:** Yes

### Q6. Try looking up a Bible verse on the site (e.g. John 3:16).
- **Type:** Multiple choice
- **Options:**
  - Found it quickly
  - Found it but took a while
  - Couldn't find it
  - Didn't try
- **Required:** Yes

### Q7. Try filling out one form on the site (prayer request, volunteer sign-up, or contact — any one).
- **Type:** Multiple choice
- **Options:**
  - Submitted, got confirmation it worked
  - Submitted, but wasn't sure if it worked
  - Tried but couldn't submit
  - Didn't try
- **Required:** Yes

### Q8. Did the site feel slow to load on your phone, especially the homepage?
- **Type:** Multiple choice
- **Options:**
  - No, felt fine
  - Yes, a bit slow
  - Yes, very slow
  - Didn't notice
- **Required:** Yes

### Q9. Did you try refreshing the page or using your phone's back button while on the site?
- **Type:** Multiple choice
- **Options:**
  - Yes, and it worked as I expected
  - Yes, and it took me somewhere I didn't expect
  - No, didn't try
- **Required:** Yes

---

## Section 4: Giving

### Q10. Have you personally ever given/tithed using M-Pesa (for church or anything else)?
- **Type:** Multiple choice
- **Options:**
  - Yes, church
  - Yes, something else
  - No
- **Required:** Yes
- **Skip logic:** If "No" → Skip to Section 5

### Q11. Try the "Give" page on the site (you don't need to complete a real payment — just go through the steps up to entering your phone number). How clear did each step feel?
- **Type:** Multiple choice
- **Options:**
  - Very clear throughout
  - Clear until the payment step
  - Confusing early on
  - Didn't try
- **Required:** Yes

---

## Section 5: Open Text

### Q12. Think of the one moment during this survey where the site did something you didn't expect. What happened?
- **Type:** Short answer (optional)
- **Placeholder:** "Optional - one sentence is fine"
- **Required:** No

### Q13. Is there anything about the site that would stop you from using it again next week?
- **Type:** Short answer (optional)
- **Placeholder:** "Optional"
- **Required:** No

### Q14. Anything else you want to tell us?
- **Type:** Short answer (optional)
- **Placeholder:** "Optional"
- **Required:** No

---

## Section 6: Quick Usability Rating

**Section Description:** Rate 1 (Strongly Disagree) to 5 (Strongly Agree):

### Q15. I found the website easy to use.
- **Type:** Linear scale
- **Scale:** 1 to 5
- **Labels:** 1 = Strongly Disagree, 5 = Strongly Agree
- **Required:** Yes

### Q16. I think most people my age would learn to use this site quickly.
- **Type:** Linear scale
- **Scale:** 1 to 5
- **Labels:** 1 = Strongly Disagree, 5 = Strongly Agree
- **Required:** Yes

### Q17. I felt confident while using the site.
- **Type:** Linear scale
- **Scale:** 1 to 5
- **Labels:** 1 = Strongly Disagree, 5 = Strongly Agree
- **Required:** Yes

### Q18. The site felt consistent as I moved between pages.
- **Type:** Linear scale
- **Scale:** 1 to 5
- **Labels:** 1 = Strongly Disagree, 5 = Strongly Agree
- **Required:** Yes

---

## Skip Logic Summary

| Question | Condition | Action |
|----------|-----------|--------|
| Q1 | "Under 13" selected | End survey |
| Q2 | "No" selected | Show instruction to visit site |
| Q10 | "No" selected | Skip to Section 5 |

---

## Google Forms Implementation Notes

1. **Creating the form:**
   - Go to forms.google.com
   - Click "+" to create new form
   - Add title and description as specified above

2. **Adding sections:**
   - Use "Add section" button to create the 6 sections
   - Name each section according to the guide

3. **Setting up skip logic:**
   - For Q1: Click on question → Click "⋮" (three dots) → "Go to section based on answer"
   - For Q2: Similar setup for "No" option
   - For Q10: Similar setup for "No" option

4. **Question types:**
   - Multiple choice: For single-select questions
   - Checkboxes: For Q3 (multiple selections)
   - Linear scale: For Q15-Q18
   - Short answer: For optional open text questions

5. **Required fields:**
   - Mark questions as required using the toggle at bottom of each question

6. **Testing:**
   - Preview form using eye icon
   - Test all skip logic paths
   - Complete form yourself to check timing (aim for 4-6 minutes)

---

## Form URL Structure

Once created, your Google Form will have a URL like:
`https://docs.google.com/forms/d/e/[FORM_ID]/viewform`

You can embed this in the ACK Berea website or share the direct link with youth group members.

---

## Data Collection

Google Forms automatically collects responses in a Google Sheet:
- Go to "Responses" tab
- Click "Create spreadsheet"
- Responses will appear in real-time as people submit

---

## Tips for Success

1. **Test thoroughly:** Complete the form yourself 3-4 times testing different paths
2. **Mobile optimization:** Google Forms are mobile-friendly by default
3. **Share strategically:** Send to youth WhatsApp groups, post on church social media
4. **Set deadline:** Give respondents 1-2 weeks to complete
5. **Remind:** Send reminder after first week
6. **Analyze:** Focus on Q7 results (form submission clarity) as key metric