# ACK Berea Youth Website Survey - Complete Setup Guide

## Overview

This package contains everything you need to create and deploy a Google Form survey for the ACK Berea Church website. The survey is designed to gather feedback from young people about their website experience.

## Files Created

### 1. `google-form-guide.md`
**Complete step-by-step guide** for creating the Google Form in Google Forms. Includes:
- All 18 questions with exact wording
- Skip logic configuration
- Section organization
- Form settings
- Testing checklist

### 2. `quick-reference.md`
**Quick reference card** for understanding the survey structure and key metrics. Includes:
- Website features to test
- Critical questions to watch
- Skip logic paths
- Data analysis focus areas
- Distribution strategy

### 3. `survey-embed.html`
**Embeddable HTML template** for adding the survey to the ACK Berea website. Includes:
- Professional church-themed design
- Instructions for participants
- Embedded Google Form frame
- Direct links to church website

## Quick Start

### Step 1: Create Google Form (10-15 minutes)
1. Open `google-form-guide.md`
2. Go to [forms.google.com](https://forms.google.com)
3. Create new form and follow the guide step-by-step
4. Copy the Form ID from your new form URL

### Step 2: Update HTML Template (2 minutes)
1. Open `survey-embed.html`
2. Replace all instances of `FORM_ID` with your actual Google Form ID
3. Save the file

### Step 3: Deploy Survey (5 minutes)
1. Share the Google Form link directly, OR
2. Upload `survey-embed.html` to your website hosting
3. Send the link to youth WhatsApp groups

## Survey Structure Summary

| Section | Questions | Purpose |
|---------|-----------|---------|
| Screener | Q1-Q2 | Age verification & site visit confirmation |
| Before Today | Q3-Q4 | Baseline behavior patterns |
| Task Check | Q5-Q9 | Real-time usability testing |
| Giving | Q10-Q11 | M-Pesa integration testing |
| Open Text | Q12-Q14 | Qualitative feedback |
| Usability | Q15-Q18 | Mini-SUS scoring |

## Key Features

- **Skip Logic:** Automatically routes participants based on answers
- **Mobile Optimized:** Works well on smartphones
- **Anonymous:** No personal data collected
- **Time Efficient:** 4-6 minutes completion time
- **Actionable Data:** Focus on website improvement insights

## Expected Results

After collecting responses, focus on:
1. **Q7 Results:** Form submission reliability (critical metric)
2. **Q5-Q7:** Task completion rates (aim for 70%+ success)
3. **Q15-Q18:** Usability scores (aim for 3.5+/5 average)
4. **Q8:** Mobile performance feedback

## Distribution Recommendations

1. **Primary:** Youth WhatsApp group
2. **Secondary:** Church social media (Instagram/Facebook)
3. **Tertiary:** Announcement during Sunday service
4. **Timeline:** 2-week collection period

## Support

If you need help:
1. Check the troubleshooting section in `google-form-guide.md`
2. Test the form yourself before distributing
3. Ask a tech-savvy youth leader to help with setup

## Next Steps After Survey

1. **Week 1-2:** Collect responses
2. **Week 3:** Analyze results using the metrics in `quick-reference.md`
3. **Week 4:** Prioritize website improvements based on findings
4. **Month 2:** Implement changes and consider follow-up survey