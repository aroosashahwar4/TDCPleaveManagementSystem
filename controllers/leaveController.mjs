import { v4 as uuidv4 } from 'uuid';

/**
 * Submit Leave Controller
 * Expects the Leave model to be injected in `req.model`
 */
export const submitLeave = async (req, res) => {
  try {
    const Leave = req.model; // ✅ Use injected model

    const {
      EmployeeName,
      Department,
      Designation,
      LeaveType,
      StartDate,
      EndDate,
      Reason
    } = req.body;

    // ✅ Basic validation
    if (!EmployeeName || !LeaveType || !StartDate || !EndDate) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    console.log('Submit Leave API hit with body:', req.body);
    
    // ✅ Create new leave record
    const leave = await Leave.create({
      LeaveID: uuidv4(),
      EmployeeId: null, // Add real user ID if needed
      EmployeeName,
      Department,
      Designation,
      LeaveType,
      StartDate,
      EndDate,
      Reason
    });

    // ✅ Send success response
    res.status(201).json({
      message: 'Leave submitted successfully',
      leave
    });
  } catch (error) {
    console.error('Error submitting leave:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
