
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
/*eslint-disable*/
const ConversationDetails = ({ conversation }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Customer Information</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="font-medium">Name:</span> {conversation.customerInfo?.name || 'N/A'}
              </div>
              <div className="text-sm">
                <span className="font-medium">Email:</span> {conversation.customerInfo?.email || 'N/A'}
              </div>
              <div className="text-sm">
                <span className="font-medium">Lead Score:</span> {conversation.customerInfo?.leadScore || 'N/A'}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Sales Metrics</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="font-medium">Products Discussed:</span>
                <ul className="list-disc list-inside">
                  {conversation.salesMetrics?.productDiscussed?.map((product, index) => (
                    <li key={index}>{product}</li>
                  )) || 'N/A'}
                </ul>
              </div>
              <div className="text-sm">
                <span className="font-medium">Objections:</span>
                <ul className="list-disc list-inside">
                  {conversation.salesMetrics?.objections?.map((objection, index) => (
                    <li key={index}>{objection}</li>
                  )) || 'N/A'}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Next Actions</h3>
            <ul className="list-disc list-inside mt-2">
              {conversation.salesMetrics?.nextActions?.map((action, index) => (
                <li key={index} className="text-sm">{action}</li>
              )) || 'N/A'}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};