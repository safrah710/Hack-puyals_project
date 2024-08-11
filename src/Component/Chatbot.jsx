import React from "react";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import '../App.css'

function App1() {
  const steps = [
    {
      id:'intial',
      message:'Hi, How can I help you?',
      trigger:'promt_1'
    },
    {
      id:'promt_1',
      message:'Please select your query',
      trigger:'options_1'
    },
    {
      id:'options_1',
      options:[
        {value:"Complaints",label:"Complaints",trigger:"complaints"},
        {value:"Feedback",label:"Feedback",trigger:"Feedback"},
        {value:"Poll",label:"Poll",trigger:"Poll"},
        {value:"idea submission",label:"Idea Submission",trigger:"idea submission"},
      ]
    },
    {
      id:'complaints',
      message:'Which sector is your complaint about?',
      trigger:'option_2'
    },
    {
      id:'msg_1',
      message:'Please enter your query',
      trigger:'msg_1_1'
    },
    {
      id:'msg_1_1',
      user:true,
      trigger:'support'
    },
    {
      id:'support',
      message:'Please hold for just a moment while we connect you with a customer support representative. Alternatively, you can also reach us at hackpuyals@gmail.com.',
      trigger:'end'
    },
    {
      id:'option_2',
      options:[
        {value:"Technical_error",label:"Technical error",trigger:"option_technical"},
        {value:"Service_issue",label:"Service Issue",trigger:"option_service"},
        {value:"Department_issue",label:"Department Issue",trigger:"option_department"},
      ]
    },
    {
      id:'option_technical',
      options:[
        {value:"Website_Downtime",label:"Website Downtime",trigger:"option_wd"},
        {value:"Slow_Load_Times",label:"Slow Load Times",trigger:"option_slt"},
        {value:"Form_Submission_Error",label:"Form Submission Error",trigger:"option_fse"},
        {value:"Data_Accuracy_and_Updates",label:"Data Accuracy and Updates",trigger:"option_dau"},
      ]
    },
    {
      id:'option_service',
      options:[
        {value:"how_to_fill_the_form",label:"How to Fill the Form",trigger:"steps_hff"},
        {value:"Edit_the_form",label:"Edit the Form",trigger:"steps_ef"},
        {value:"delete_the_form",label:"Delete the Form",trigger:"steps_df"},
      ]
    },
    {
      id:'option_department',
      options:[
        {value:"Public_Service",label:"Public Service",trigger:"option_ps"},
        {value:"Infrastructure",label:"Infrastructure",trigger:"option_i"},
        {value:"Administrative_Services",label:"Administrative Services",trigger:"option_as"},
        {value:"Law_Enforcement_and_Public_Safety",label:"Law Enforcement and Public Safety",trigger:"option_leps"},
        {value:"Environmental_Issues",label:"Environmental Issues",trigger:"option_ei"},
        {value:"Health_Services",label:"Health Services",trigger:"option_hs"},
        {value:"Education",label:"Education",trigger:"option_e"},
        {value:"Social_Services",label:"Social Services",trigger:"option_ss"},
        {value:"Corruption_and_Misconduct",label:"Corruption and Misconduct",trigger:"option_cm"},
        {value:"Taxes_and_Financial_Services",label:"Taxes and Financial Services",trigger:"option_tfs"},
        {value:"Legal_and_Regulatory_Issues",label:"Legal and Regulatory Issues",trigger:"option_lri"},
        {value:"Employment_and_Labor",label:"Employment and Labor",trigger:"option_el"},
        {value:"Consumer_Protection",label:"Consumer Protection",trigger:"option_cp"},
        {value:"Housing_and_Urban_Development",label:"Housing and Urban Development",trigger:"option_hud"},
        {value:"Civil_Rights",label:"Civil Rights",trigger:"option_cr"},
        {value:"Others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_wd',
      message:'Due to internal maintenance and high traffic, our website is currently down.',
      trigger:'option_wd_1'
    },
    // {
    //   id:'option_wd_1',
    //   message:'Kindly send an e-mail to hackpuyals@gmail.com',
    //   trigger:'option_wd_2'
    // },
    {
      id:'option_wd_1',
      message:'Connecting you with a support representative... or email us at hackpuyals@gmail.com.',
      trigger:'end'
    },
    {
      id:'option_slt',
      message:'Due to a heavy load and large amounts of data, our website is currently running slowly.',
      trigger:'option_slt_1'
    },
    {
      id:'option_slt_1',
      message:'Connecting you with a support representative... or email us at hackpuyals@gmail.com.',
      trigger:'end'
    },
    {
      id:'option_fse',
      message:'Please hold for just a moment while we connect you with a customer support representative. Alternatively, you can also reach us at hackpuyals@gmail.com.',
      trigger:'end'
    },
    {
      id:'option_dau',
      message:'Please hold for just a moment while we connect you with a customer support representative. Alternatively, you can also reach us at hackpuyals@gmail.com.',
      trigger:'end'
    },
    {
      id:'steps_hff',
      message:'Step 1: Go to Dashboard',
      trigger:'steps_hff_1'
    },
    {
      id:'steps_hff_1',
      message:'Step 2: Click the options icon ☰',
      trigger:'steps_hff_2'
    },
    {
      id:'steps_hff_2',
      message:'Step 3: Click on Complaints',
      trigger:'steps_hff_3'
    },
    {
      id:'steps_hff_3',
      message:'step 4: Fill the correct details in the form',
      trigger:'steps_hff_4'
    },
    {
      id:'steps_hff_4',
      message:'Step 5: If you have any proof of that complaint, upload the document in the form (If Mandatory)',
      trigger:'steps_hff_5'
    },
    {
      id:'steps_hff_5',
      message:'Step 6: After filling all the details, submit the form',
    //   trigger:'steps_hff_6'
    // },
    // {
    //   id:'steps_hff_6',
    //   message:'step 7: You have successfully raised the complaint',
      trigger:'end'
    },
    {
      id:'steps_ef',
      message:'Step 1: Go to Dashboard',
      trigger:'steps_ef_1'
    },
    {
      id:'steps_ef_1',
      message:'Step 2: Click the options icon ☰',
      trigger:'steps_ef_2'
    },
    {
      id:'steps_ef_2',
      message:'Step 3: Click on Complaints',
      trigger:'steps_ef_3'
    },
    {
      id:'steps_ef_3',
      message:'Step 4: Select the form which you have to edit',
      trigger:'steps_ef_4'
    },
    {
      id:'steps_ef_4',
      message:'Step 5: Edit the details',
      trigger:'steps_ef_5'
    },
    {
      id:'steps_ef_5',
      message:'Step 6:  After editing the details, submit the form',
      trigger:'end'
    },
    {
      id:'steps_df',
      message:'Step 1: Go to Dashboard',
      trigger:'steps_df_1'
    },
    {
      id:'steps_df_1',
      message:'Step 2: Click the options icon ☰',
      trigger:'steps_df_2'
    },
    {
      id:'steps_df_2',
      message:'Step 3: Click on Complaints',
      trigger:'steps_df_3'
    },
    {
      id:'steps_df_3',
      message:'Step 4: Select the form which you have to delete',
      trigger:'steps_df_4'
    },
    {
      id:'steps_df_4',
      message:'Step 5: Click on delete option',
    //   trigger:'steps_df_5'
    // },
    // {
    //   id:'steps_df_5',
    //   message:'step 6: Your Form has been deleted successfully',
      trigger:'end'
    },
    {
      id:'option_ps',
      message:'select the type of Public Services issuse you are experencing',
      trigger:'option_ps_1'
    },
    { 
      id:'option_ps_1',
      options:[
        {value:"public_transportation",label:"Public Transportation",trigger:"all"},
        {value:"postal_services",label:"Postal Services",trigger:"all"},
        {value:"utilities",label:"Utilities",trigger:"all"},
        {value:"Others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_i',
      message:'Select the type of Infrastructure problem you are experencing',
      trigger:'option_i_1'
    },
    {
      id:'option_i_1',
      options:[
        {value:"Roads",label:"Roads",trigger:"all"},
        {value:"bridges",label:"Bridges",trigger:"all"},
        {value:"public_buildings",label:"Public Buildings",trigger:"all"},
        {value:"parks",label:"Parks",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_as',
      message:'Select the type of Administrative Services issuse you are experencing',
      trigger:'option_as_1'
    },
    {
      id:'option_as_1',
      options:[
        {value:"Passports",label:"Passports",trigger:"all"},
        {value:"Birth_certificates",label:"Birth Certificates",trigger:"all"},
        {value:"Driver's_licenses",label:"Driver's Licenses",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_leps',
      message:'Select the type of Law Enforcement and Public Safety problem you are experencing',
      trigger:'option_leps_1'
    },
    {
      id:'option_leps_1',
      options:[
        {value:"police_conduct",label:"Police_Conduct",trigger:"all"},
        {value:"crime_rates",label:"Crime Rates",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_ei',
      message:'Select which type of Environmental Issues you are experencing',
      trigger:'option_ei_1'
    },
    {
      id:'option_ei_1',
      options:[
        {value:"pollution",label:"Pollution",trigger:"all"},
        {value:"waste_management",label:"Waste Management",trigger:"all"},
        {value:"deforestation",label:"Deforestation",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_hs',
      message:'Select the type of Health Services problem you are experencing',
      trigger:'option_hs_1'
    },
    {
      id:'option_hs_1',
      options:[
        {value:"public_hospitals",label:"Public Hospitals",trigger:"all"},
        {value:"clinics",label:"Clinics",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_e',
      message:'Select the type of Education problem you are experencing',
      trigger:'option_e_1'
    },
    {
      id:'option_e_1',
      options:[
        {value:"public_schools",label:"Public Schools",trigger:"all"},
        {value:"universities",label:"Universities",trigger:"all"},
        {value:"educational_programs",label:"Educational Programs",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_ss',
      message:'Select the type of Social Services problem you are experencing',
      trigger:'option_ss_1'
    },
    {
      id:'option_ss_1',
      options:[
        {value:"welfare_programs",label:"Welfare Programs",trigger:"all"},
        {value:"unemployment_benefits",label:"Unemployment Benefits",trigger:"all"},
        {value:"housing_assistance",label:"Housing Assistance",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_cm',
      message:'Select the type of Corruption and Misconduct problem you are experencing',
      trigger:'option_cm_1'
    },
    {
      id:'option_cm_1',
      options:[
        {value:"corruption",label:"Corruption",trigger:"all"},
        {value:"fraud",label:"Fraud",trigger:"all"},
        {value:"unethical_behavior_by_government_officials",label:"Unethical Behavior by Government Officials",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_tfs',
      message:'Select the type of Taxes and Financial Services issues you are facing',
      trigger:'option_tfs_1'
    },
    {
      id:'option_tfs_1',
      options:[
        {value:"tax_filings",label:"Tax Filings",trigger:"all"},
        {value:"refunds",label:"Refunds",trigger:"all"},
        {value:"assessments",label:"Assessments",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_lri',
      message:'Select the type of Legal and Regulatory Issues you are facing',
      trigger:'option_lri_1'
    },
    {
      id:'option_lri_1',
      options:[
        {value:"unfair_regulations",label:"Unfair Regulations",trigger:"all"},
        {value:"legal_disputes",label:"Legal Disputes",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_el',
      message:'Select the type of Employment and Labor problem you are facing',
      trigger:'option_el_1'
    },
    {
      id:'option_el_1',
      options:[
        {value:"public_sector_employment",label:"Public Sector Employment",trigger:"all"},
        {value:"labor_laws",label:"Labor Laws",trigger:"all"},
        {value:"workplace_rights",label:"Workplace Rights",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_cp',
      message:'Select the type of Consumer Protection problem you are facing',
      trigger:'option_cp_1'
    },
    {
      id:'option_cp_1',
      options:[
        {value:"businesses",label:"Businesses",trigger:"all"},
        {value:"products",label:"Products",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_hud',
      message:'Select the type of Housing and Urban Development problem you are experencing',
      trigger:'option_hud_1'
    },
    {
      id:'option_hud_1',
      options:[
        {value:"public_housing",label:"Public Housing",trigger:"all"},
        {value:"urban_planning",label:"Urban Planning",trigger:"all"},
        {value:"zoning_laws",label:"Zoning Laws",trigger:"all"},
        {value:"real_estate_regulations",label:"Real Estate Regulations",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'option_cr',
      message:'Select the type of Civil Rights problem you are facing',
      trigger:'option_cr_1'
    },
    {
      id:'option_cr_1',
      options:[
        {value:"discrimination",label:"Discrimination",trigger:"all"},
        {value:"violation_of_rights",label:"Violation of Rights",trigger:"all"},
        {value:"others",label:"Others",trigger:"msg_1"},
      ]
    },
    {
      id:'all',
      message:'Go to Complaints section and file a complaint',
      trigger:'ss'
    },
    {
      id:'ss',
      message:'Need help with the form? Go to Main Menu > Service Issues for guidance',
      trigger:'ss_1'
    },
    {
      id:'ss_1',
      message:'Else give Continue',
      trigger:'Main_menu' 
    },
    {
      id:'Main_menu',
      options:[
        {value:"Main_menu",label:"Main Menu",trigger:"option_2"},
        {value:"continue",label:"Continue",trigger:"Continue"},
      ]
    },
    {
      id:'Continue',
      message:'IF your issue remains unresolved',
      trigger:'support'
    },
    {
      id:'Feedback',
      message:'Please select your feedback regarding the G.O',
      trigger:'options_f'
    },
    {
      id:'options_f',
      options:[
        {value:"What_do_you_like/dislike_about_the_G.O?",label:"What do you like/dislike about the G.O?",trigger:"f_1"},
        {value:"Is_there_anything_that_needs_clarification_or_improvement?",label:"Is there anything that needs clarification or improvement?",trigger:"f_1"},
        {value:"Do_you_have_any_suggestions_for_future_modifications?",label:"Do you have any suggestions for future modifications?",trigger:"f_1"},
        {value:"Other_comments_or_concerns?",label:"Other comments or concerns?",trigger:"f_1"},
      ]
    },
    {
      id:'f_1',
      message:'Please enter your feedback',
      trigger:'msg_2'
    },
    {
      id:'msg_2',
      user:true,
      trigger:'end_1'
    },
    {
      id:'end_1',
      message:'Your response has been recorded',
      trigger:'end'
    },
    {
      id:'Poll',
      message:'Are you satisfied with this G.O?',
      trigger:'options_3'
    },
    {
      id:'options_3',
      options:[
        {value:"Strongly_Satisfied", label:"Strongly Satisfied",trigger:"end"},
        {value:"Somewhat_Satisfied", label:"Somewhat Satisfied",trigger:"end"},
        {value:"Neutral", label:"Neutral",trigger:"end"},
        {value:"Somewhat_Dissatisfied", label:"Somewhat Dissatisfied",trigger:"end"},
        {value:"Strongly_Dissatisfied", label:"Strongly Dissatisfied",trigger:"end"},
      ]
    },
    {
      id:'idea submission',
      message:'Do you have an innovative solution or suggestion to address any issue? Please enter your ideas below and help us improve!(Max 200 words)',
      trigger:'msg_3'
    },
    {
      id:'msg_3',
      user:true,
      trigger:'end'
    },
    {
      id:'end',
      message:'Thank You',
      end:true
    },
  ]

  return (
    <>
    <div className="gg">
      <ChatBot steps={steps} style={{height:'100%', width:'1280px'}}/>
    </div>
    </>
  );
}

export default App1