# Monefy Exploratory Testing Report

### Environment
- Device: iPhone 12
- OS: iOS 18.2.1

---

## Exploratory Testing Charters
1. **Installation Process**  
   Charter: Verify the installation process, including trial activation and subscription handling.  
   Findings:
    - Issue: If the user does not activate the trial immediately, they can only subscribe without a trial later.

2. **Income Transactions**  
   Charter: Test adding income transactions with various parameters (amount, date, type, notes).  
   Findings:
    - Issue: The input form resembles a calculator but lacks functionality, which could confuse users.
    - Observations:
        - Tested adding income transactions with integer amounts, decimal values, and numbers starting with 0. All cases worked as expected.
        - Verified income transactions with past, current, and future dates. No issues detected.
        - Notes with comments, symbols, and emojis were successfully added to transactions.
        - Income types tested: salary, deposit, and savings. All types saved correctly.

3. **Expense Transactions**  
   Charter: Test adding and managing expense transactions with various parameters, including categories and scheduled options.  
   Findings:
    - Issue: Default categories can be deleted without a subscription, even though adding categories is restricted.
    - Issue: Deleting a category removes associated expenses without reassignment (e.g., to an "Uncategorized" category).
    - Observations:
        - Tested adding expense transactions with integer amounts, decimal values, and numbers starting with 0. All cases worked as expected.
        - Verified expense transactions with past, current, and future dates. No issues detected.
        - Notes with comments, symbols, and emojis were successfully added to transactions.
        - Categories were tested, including default and user-created (subscription required). New categories saved correctly when subscription was active.
        - Successfully selected accounts for expenses and created scheduled transactions (subscription-only feature).

4. **Transaction List Management**  
   Charter: Validate the transaction list, sorting, and editing capabilities.  
   Findings:
    - Observation: Transactions with different currencies in the same category might lead to inconsistencies.

5. **Account Management**  
   Charter: Test multi-account functionality, including transfers and currency support.  
   Findings:
    - Issue: Transferring more money than available in an account results in negative balances, which may not align with user expectations.

6. **Modes (Default & Budget)**  
   Charter: Evaluate budget mode functionality and its integration with regular transaction tracking.  
   Findings:
    - No issues identified.

7. **Appearance and Usability**  
   Charter: Review UI/UX elements like themes, diagrams, and navigational clarity.  
   Findings:
    - Issue: Clicking a category in the diagram opens the full transaction list instead of filtering to that category.
    - Issue: Missing connecting lines from icons to categories in the diagram.

8. **Data Export**  
   Charter: Test data export options and configurations.  
   Findings:
    - No issues identified.

9. **Offline Functionality**  
   Charter: Verify offline features for creating income and expense records.  
   Findings:
    - No issues identified.

10. **Backup and Restore**  
    Charter: Test data backup and restore functionalities.  
    Findings:
    - Issue: Restoring a backup after clearing data leaves the app empty, failing to reload data.

---

## Findings Summary
### Issues Discovered:
1. Missing trial activation option after initial setup.
2. Calculator-like form for entering income lacks functionality.
3. Deletion of categories removes associated transactions permanently.
4. Negative balances allowed for accounts.
5. Inconsistent navigation and filtering in diagrams.
6. Data restoration from backups fails post-clearance.

---

## Prioritization of Charters

| Priority | Charter                        | Reason for Priority                                  |
|----------|--------------------------------|----------------------------------------------------|
| High     | Backup and Restore            | Data loss during backup/restore is critical.       |
| High     | Expense Transactions          | Loss of data due to category deletion impacts UX.  |
| Medium   | Income Transactions           | Confusing UI (calculator form) affects usability.  |
| Medium   | Account Management            | Negative balances may mislead users.               |
| Low      | Appearance and Usability      | Navigation inconsistencies are non-critical.       |

---

## Risks
1. **Data Security**  
   Personal data leaks. Even though Monefy doesn't use real transactions, sensitive information about income and expenses must be encrypted and protected.

2. **Data Integrity**  
   Deleting categories without reassignment leads to data loss, potentially causing user frustration and mistrust.

3. **Financial Mismanagement**  
   Allowing negative balances or inconsistent handling of currencies can result in user errors in financial planning.

4. **User Retention**  
   Limited trial options and poor navigation (e.g., diagrams) could deter new users from subscribing.

5. **Backup Reliability**  
   A failure in restoring backups can lead to complete data loss, reducing trust in the app's reliability.
