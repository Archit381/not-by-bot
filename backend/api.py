import pyautogui
import time

time.sleep(6)

cpp_code = """

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Edge {
int from;
int to;
int cost;

Edge(int _from, int _to, int _cost) : from(_from), to(_to), cost(_cost) {}
};

struct DisjointSet {
vector<int> parent;
vector<int> rank;

DisjointSet(int n) {
parent.resize(n);
rank.resize(n);
for (int i = 0; i < n; ++i) {
parent[i] = i;
rank[i] = 0;
}
}

int find(int x) {
if (parent[x] != x) {
parent[x] = find(parent[x]);
}
return parent[x];
}

void merge(int x, int y) {
int rootX = find(x);
int rootY = find(y);
if (rootX != rootY) {
if (rank[rootX] < rank[rootY]) {
parent[rootX] = rootY;
} else if (rank[rootX] > rank[rootY]) {
parent[rootY] = rootX;
} else {
parent[rootY] = rootX;
rank[rootX]++;
}
}
}
};

bool compareEdges(const Edge& e1, const Edge& e2) {
return e1.cost < e2.cost;
}

int kruskalMST(int n, vector<Edge>& edges) {
sort(edges.begin(), edges.end(), compareEdges);

DisjointSet ds(n);
int minCost = 0;

for (const Edge& edge : edges) {
if (ds.find(edge.from) != ds.find(edge.to)) {
ds.merge(edge.from, edge.to);
minCost += edge.cost;
}
}

return minCost;
}

int main() {
int n, m;
cout << "Enter the number of islands and the number of cables: ";
cin >> n >> m;

vector<Edge> edges;

cout << "Enter the islands connected by each cable and its cost (from to cost):" << endl;
for (int i = 0; i < m; ++i) {
int from, to, cost;
cin >> from >> to >> cost;
edges.push_back(Edge(from, to, cost));
}

int minCost = kruskalMST(n, edges);

cout << "Minimum cost of laying the cables: " << minCost << endl;

return 0;
}

"""

pyautogui.write(cpp_code)