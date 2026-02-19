# CorelDRAW Circles On Curve Plugin - Complete Installation Guide

## Overview
This guide will help you create a professional CorelDRAW plugin that places circles along any curve with advanced options for rotation, welding, and laser-ready output.

---

## 🔵 STEP 1 — CREATE USERFORM

### 1.1 Open VBA Editor
1. Open CorelDRAW
2. Press `Alt + F11` to open the VBA Editor
3. In the Project Explorer (left panel), find your document

### 1.2 Insert UserForm
1. Go to **Insert → UserForm**
2. A new form will appear in the designer

### 1.3 Rename the UserForm
1. With the UserForm selected, press `F4` to open the Properties window
2. Find the `(Name)` property at the top
3. Change it from `UserForm1` to: **`frmCircles`**
4. Find the `Caption` property
5. Change it to: **`Circles On Curve - Commercial Edition`**

---

## 🔵 STEP 2 — ADD CONTROLS TO FORM

Add the following controls by clicking them in the Toolbox and drawing them on the form:

### 2.1 Labels (for text identification)
Add **Label** controls with these captions:
- "Number of Circles:"
- "Circle Size (mm):"
- "Offset Distance (mm):"

### 2.2 TextBoxes (for user input)
Add **3 TextBox** controls and set their properties:

| Control | (Name) Property |
|---------|----------------|
| TextBox1 | `txtCount` |
| TextBox2 | `txtSize` |
| TextBox3 | `txtOffset` |

### 2.3 CheckBoxes (for options)
Add **4 CheckBox** controls and set their properties:

| Control | (Name) Property | Caption Property |
|---------|----------------|------------------|
| CheckBox1 | `chkRotate` | "Rotate Along Curve" |
| CheckBox2 | `chkOutline` | "Outline Only (Laser Ready)" |
| CheckBox3 | `chkWeld` | "Weld Shapes" |
| CheckBox4 | `chkGroup` | "Group Shapes" |

### 2.4 Command Buttons
Add **2 CommandButton** controls and set their properties:

| Control | (Name) Property | Caption Property |
|---------|----------------|------------------|
| CommandButton1 | `btnCreate` | "Create" |
| CommandButton2 | `btnCancel` | "Cancel" |

### 2.5 Suggested Layout
```
┌─────────────────────────────────────────┐
│  Circles On Curve - Commercial Edition  │
├─────────────────────────────────────────┤
│                                         │
│  Number of Circles:    [txtCount    ]  │
│  Circle Size (mm):     [txtSize     ]  │
│  Offset Distance (mm): [txtOffset   ]  │
│                                         │
│  ☑ Rotate Along Curve                  │
│  ☑ Outline Only (Laser Ready)          │
│  ☐ Weld Shapes                          │
│  ☑ Group Shapes                         │
│                                         │
│     [  Create  ]    [  Cancel  ]        │
└─────────────────────────────────────────┘
```

---

## 🔵 STEP 3 — ADD CODE TO USERFORM

### 3.1 Open Code Window
1. Double-click on the UserForm (not on any control)
2. The code window will open
3. **Delete any auto-generated code** (like `Private Sub UserForm_Click()`)

### 3.2 Paste Complete UserForm Code
Copy and paste this **ENTIRE CODE** into the UserForm code window:

```vba
Option Explicit

Private Sub UserForm_Initialize()

    Me.Caption = "Circles On Curve - Commercial Edition"
    
    txtCount.Text = "20"
    txtSize.Text = "5"
    txtOffset.Text = "0"
    
    chkRotate.Caption = "Rotate Along Curve"
    chkRotate.Value = True
    
    chkOutline.Caption = "Outline Only (Laser Ready)"
    chkOutline.Value = True
    
    chkWeld.Caption = "Weld Shapes"
    chkWeld.Value = False
    
    chkGroup.Caption = "Group Shapes"
    chkGroup.Value = True

End Sub

Private Sub btnCreate_Click()

    If ActiveSelection.Shapes.Count = 0 Then
        MsgBox "Please select a curve first.", vbExclamation
        Exit Sub
    End If
    
    Dim s As Shape
    Set s = ActiveSelection.Shapes(1)
    
    If s.Type <> cdrCurveShape Then
        MsgBox "Selected object must be a curve.", vbExclamation
        Exit Sub
    End If
    
    Dim count As Long
    Dim sizeValue As Double
    Dim offset As Double
    
    count = Val(txtCount.Text)
    sizeValue = Val(txtSize.Text)
    offset = Val(txtOffset.Text)
    
    If count <= 0 Or sizeValue <= 0 Then
        MsgBox "Enter valid values.", vbExclamation
        Exit Sub
    End If
    
    Dim curveLength As Double
    curveLength = s.Curve.Length
    
    Dim spacing As Double
    
    If count > 1 Then
        spacing = curveLength / (count - 1)
    Else
        spacing = 0
    End If
    
    Dim sr As New ShapeRange
    Dim i As Long
    
    For i = 0 To count - 1
        
        Dim pos As Double
        pos = spacing * i
        
        Dim x As Double, y As Double
        Dim x2 As Double, y2 As Double
        
        s.Curve.GetPointAtLength pos, x, y
        
        If pos + 0.1 <= curveLength Then
            s.Curve.GetPointAtLength pos + 0.1, x2, y2
        Else
            s.Curve.GetPointAtLength pos - 0.1, x2, y2
        End If
        
        Dim angle As Double
        angle = Atn2(y2 - y, x2 - x)
        
        x = x + offset * Cos(angle + 1.5708)
        y = y + offset * Sin(angle + 1.5708)
        
        Dim newShape As Shape
        Set newShape = ActiveLayer.CreateEllipse2(x, y, sizeValue / 2)
        
        If chkRotate.Value = True Then
            newShape.Rotate angle * 180 / 3.14159265358979
        End If
        
        If chkOutline.Value = True Then
            newShape.Fill.ApplyNoFill
            newShape.Outline.Width = 0.2
        End If
        
        sr.Add newShape
        
    Next i
    
    If chkWeld.Value = True Then
        Set sr = sr.Weld
    End If
    
    If chkGroup.Value = True Then
        sr.Group
    End If
    
    MsgBox "Circles created successfully!", vbInformation
    
    Unload Me

End Sub

Private Sub btnCancel_Click()
    Unload Me
End Sub

Private Function Atn2(y As Double, x As Double) As Double

    If x = 0 Then
        If y > 0 Then
            Atn2 = 3.14159265358979 / 2
        Else
            Atn2 = -3.14159265358979 / 2
        End If
    Else
        Atn2 = Atn(y / x)
        If x < 0 Then
            Atn2 = Atn2 + 3.14159265358979
        End If
    End If

End Function
```

---

## 🔵 STEP 4 — CREATE MODULE

### 4.1 Insert Module
1. In the VBA Editor, go to **Insert → Module**
2. A new module will appear (Module1)

### 4.2 Paste Module Code
Copy and paste this code into the module:

```vba
Option Explicit

Public Sub CirclesOnCurve()
    frmCircles.Show
End Sub
```

---

## 🔵 STEP 5 — SAVE AS PLUGIN (.GMS FILE)

### 5.1 Save the Project
1. In the VBA Editor, go to **File → Save As**
2. Navigate to the GMS folder:
   ```
   C:\Users\[YOURNAME]\AppData\Roaming\Corel\CorelDRAW Graphics Suite\Draw\GMS
   ```
   > **Note:** Replace `[YOURNAME]` with your Windows username
   
3. File name: **`CirclesOnCurve.gms`**
4. Save as type: **CorelDRAW Macro Storage (*.gms)**
5. Click **Save**

### 5.2 Finding the GMS Folder
If you can't find the folder:
1. Press `Win + R`
2. Type: `%AppData%\Corel`
3. Navigate to: `CorelDRAW Graphics Suite\Draw\GMS`

---

## 🔵 STEP 6 — RESTART CORELDRAW

1. Close CorelDRAW completely
2. Reopen CorelDRAW
3. The macro is now available

---

## 🔵 STEP 7 — ADD TO TOOLBAR (OPTIONAL)

### 7.1 Open Customization
1. Go to **Tools → Customization** (or press `Ctrl + J`)
2. Click on **Commands** in the left panel

### 7.2 Find Your Macro
1. In the Commands list, expand **Macros**
2. Find **CirclesOnCurve.gms**
3. Expand it to see **CirclesOnCurve** macro

### 7.3 Add to Toolbar
1. Drag **CirclesOnCurve** from the list
2. Drop it onto any toolbar
3. Click **OK** to close Customization

### 7.4 Customize Button (Optional)
1. Right-click on the new toolbar button
2. Select **Customize**
3. You can change:
   - Button icon
   - Button text
   - Tooltip text

---

## 🎯 HOW TO USE THE PLUGIN

### Basic Usage
1. Draw a curve in CorelDRAW (any path or shape)
2. Select the curve
3. Click your toolbar button (or run the macro)
4. Adjust settings in the dialog:
   - **Number of Circles:** How many circles to place
   - **Circle Size:** Diameter in mm
   - **Offset Distance:** Distance from curve (+ or -)
5. Check/uncheck options as needed
6. Click **Create**

### Options Explained
- **Rotate Along Curve:** Circles follow the curve's direction
- **Outline Only (Laser Ready):** No fill, thin outline (0.2mm)
- **Weld Shapes:** Combines all circles into one shape
- **Group Shapes:** Groups all circles together

---

## 🔧 TROUBLESHOOTING

### "Please select a curve first"
- Make sure you have a curve selected before running the macro
- The object must be a curve, not a rectangle or text

### "Selected object must be a curve"
- Convert your shape to a curve: Select it → **Arrange → Convert to Curves** (Ctrl+Q)

### Macro doesn't appear in toolbar
- Make sure you saved the file as `.gms` in the correct GMS folder
- Restart CorelDRAW
- Check that the file is not blocked (Right-click file → Properties → Unblock)

### Circles appear in wrong location
- Check your offset value (use 0 for circles on the curve)
- Ensure your curve is not grouped with other objects

---

## ✅ VERIFICATION CHECKLIST

Before saving, verify:
- [ ] UserForm is named `frmCircles`
- [ ] All 3 TextBoxes are named correctly (`txtCount`, `txtSize`, `txtOffset`)
- [ ] All 4 CheckBoxes are named correctly (`chkRotate`, `chkOutline`, `chkWeld`, `chkGroup`)
- [ ] Both buttons are named correctly (`btnCreate`, `btnCancel`)
- [ ] UserForm code is pasted completely
- [ ] Module code is pasted in a separate module
- [ ] File is saved as `.gms` in the GMS folder
- [ ] CorelDRAW has been restarted

---

## 📝 NOTES

- This plugin works with CorelDRAW X6 and later versions
- The plugin creates circles at evenly spaced points along the curve
- Offset values can be positive (outside curve) or negative (inside curve)
- The "Weld" option is useful for creating continuous patterns
- "Laser Ready" mode creates hairline outlines perfect for laser cutting

---

## 🎉 SUCCESS!

You now have a professional CorelDRAW plugin for creating circles along curves. This is perfect for:
- Decorative patterns
- Laser cutting designs
- Technical illustrations
- Jewelry design
- Architectural details

Enjoy your new plugin! 🚀
